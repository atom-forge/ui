<script lang="ts">
    import { setContext } from "svelte";
    import { twMerge } from "tailwind-merge";
    import { onMount } from "svelte";

    export type GroupRules = {
        [targetListId: string]: {
            accepts: string[] | boolean;
        };
    };

    // Callbacks the group exposes so child SortableLists can call back up
    export interface GroupContext {
        rules: GroupRules | undefined;
        typeField: string;
        dndType: string;
        /** Called when a cross-list drop has been resolved */
        onCrossListDrop: (args: {
            sourceListId: string;
            targetListId: string;
            itemId: string | number;
            targetIndex?: number; // optional: insert at specific position, default = append at end
        }) => void;
    }

    // Map<listId, { items, setItems }>  — registered by each child SortableList
    type ListRegistry = Map<
        string,
        {
            getItems: () => any[];
            setItems: (items: any[]) => void;
        }
    >;

    interface Props {
        class?: string;
        rules?: GroupRules;
        typeField?: string;
        children?: import("svelte").Snippet;
        [key: string]: unknown;
    }

    let {
        class: classes,
        rules,
        typeField = "type",
        children,
        ...props
    }: Props = $props();

    const registry: ListRegistry = new Map();
    const dndType = `sortable-group-${Math.random().toString(36).slice(2)}`;

    function registerList(
        listId: string,
        getItems: () => any[],
        setItems: (items: any[]) => void,
    ) {
        registry.set(listId, { getItems, setItems });
        return () => registry.delete(listId);
    }

    function canDrop(
        targetListId: string,
        itemType: string | undefined,
    ): boolean {
        if (!rules) return true;
        const rule = rules[targetListId];
        if (!rule) return true;
        if (rule.accepts === true) return true;
        if (rule.accepts === false) return false;
        if (!itemType) return true;
        return (rule.accepts as string[]).includes(itemType);
    }

    // Provide context to child SortableLists
    setContext<GroupContext>("dnd-group", {
        get rules() {
            return rules;
        },
        get typeField() {
            return typeField;
        },
        dndType,
        onCrossListDrop({ sourceListId, targetListId, itemId, targetIndex }) {
            const sourceList = registry.get(sourceListId);
            const targetList = registry.get(targetListId);
            if (!sourceList || !targetList) return;

            const sourceItems = [...sourceList.getItems()];
            const itemIndex = sourceItems.findIndex((i) => i.id === itemId);
            if (itemIndex === -1) return;

            const [movedItem] = sourceItems.splice(itemIndex, 1);

            const itemType = movedItem[typeField];
            const allowed = canDrop(targetListId, itemType);
            if (!allowed) return;

            sourceList.setItems(sourceItems);
            const targetItems = [...targetList.getItems()];
            const insertAt = targetIndex ?? targetItems.length;
            targetItems.splice(insertAt, 0, movedItem);
            targetList.setItems(targetItems);
        },
    });

    // Also expose registerList via context so child SortableLists can self-register
    setContext<
        (
            listId: string,
            getItems: () => any[],
            setItems: (v: any[]) => void,
        ) => () => void
    >("dnd-group-register", registerList);

    const cls = $derived(twMerge(classes));
</script>

<div class={cls} {...props}>
    {#if children}{@render children()}{/if}
</div>
