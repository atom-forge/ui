<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

    import ListExample from "./examples/ListExample.svelte";
    import listExample from "./examples/ListExample.svelte?raw";
    import HorizontalExample from "./examples/HorizontalExample.svelte";
    import horizontalExample from "./examples/HorizontalExample.svelte?raw";
    import GridExample from "./examples/GridExample.svelte";
    import gridExample from "./examples/GridExample.svelte?raw";
    import KanbanExample from "./examples/KanbanExample.svelte";
    import kanbanExample from "./examples/KanbanExample.svelte?raw";
    import CustomIndicatorExample from "./examples/CustomIndicatorExample.svelte";
    import customIndicatorExample from "./examples/CustomIndicatorExample.svelte?raw";
    import EmptyStateExample from "./examples/EmptyStateExample.svelte";
    import emptyStateExample from "./examples/EmptyStateExample.svelte?raw";
    import GrabbedClassExample from "./examples/GrabbedClassExample.svelte";
    import grabbedClassExample from "./examples/GrabbedClassExample.svelte?raw";
    import DragHandleExample from "./examples/DragHandleExample.svelte";
    import dragHandleExample from "./examples/DragHandleExample.svelte?raw";

    import ChangeExample from "./examples/ChangeExample.svelte";
    import changeExample from "./examples/ChangeExample.svelte?raw";

    import ActionsExample from "./examples/ActionsExample.svelte";
    import actionsExample from "./examples/ActionsExample.svelte?raw";

    import IndicatorsExample from "./examples/IndicatorsExample.svelte";
    import indicatorsExample from "./examples/IndicatorsExample.svelte?raw";

    const props: PropDef[] = [
        { group: "dnd.draggable", name: "options", type: "DraggableOptions", description: "data, dragHandle or dragHandleSelector, canDrag, onGenerateDragPreview, onDragStart, onDrop. Native pointer DnD. Handle and callback registrations are established at action initialization; do not assume changing them re-registers the adapter." },
        { group: "dnd.dropTarget", name: "options", type: "DropTargetOptions", description: "getData({ input, element }), canDrop, onDragEnter, onDragLeave, onDrop, onDrag. Callbacks receive source and location from Pragmatic DnD; getData returns a record." },
        { group: "dnd", name: "getMonitor()", type: "Promise<monitorForElements>", description: "Lazily loads the monitor factory. Call on mount and clean up the returned registration on unmount. These helpers must be used in browser lifecycle code." },
        { group: "dnd", name: "getPreview()", type: "Promise<setCustomNativeDragPreview>", description: "Lazily loads the native preview factory. Load before a drag starts and call synchronously inside onGenerateDragPreview with its nativeSetDragImage and your render callback." },
        { group: "dnd", name: "getPointerOffset()", type: "Promise<pointerOutsideOfPreview>", description: "Lazily loads the offset factory for native previews. It is independent of SortableList’s unused previewOffset prop." },
        { group: "DropSlot", name: "atIndex / insertIndex", type: "number", description: "Required slot index and current insertion index. Visible only when equal." },
        { group: "DropSlot", name: "draggingItem", type: "any", description: "Required value passed to dropIndicatorSnippet." },
        { group: "DropSlot", name: "orientation", type: "'vertical' | 'horizontal' | 'grid'", description: "Required direction; horizontal and grid grow on the x axis." },
        { group: "DropSlot", name: "class", type: "string", description: "Classes on the default visual slot; not applied when a custom snippet is used." },
        { group: "DropSlot", name: "dropIndicatorSnippet", type: "Snippet<[any]>", description: "Optional custom active slot renderer." },
        { group: "DropIndicator", name: "active / horizontal", type: "boolean", default: "false", description: "Visible line state and direction. The drop target remains mounted when inactive." },
        { group: "DropIndicator", name: "listId", type: "string", default: "''", description: "List ID included in the native drop-target data." },
        { group: "DropIndicator", name: "onenter / onleave", type: "() => void", description: "Native drag entry/leave callbacks." },
        { group: "DropIndicator", name: "ondrop", type: "(source, location) => void", description: "Native drop callback. The component does not mutate any list." },
        { group: "SortableList", name: "draggingClass", type: "string", default: "'opacity-35'", description: "Classes on the non-shadow item wrapper matching the active drag ID." },
        { group: "SortableList", name: "dropIndicatorClass", type: "string", description: "Classes on the shadow item wrapper." },
        { group: "SortableList", name: "flipDurationMs", type: "number", default: "160", description: "Shared duration for the engine and Svelte flip animation, in milliseconds." },
        { group: "SortableList", name: "preservePreviewSize", type: "boolean", default: "true", description: "Accepted but unused in the 0.0.34 implementation." },
        { group: "SortableList", name: "onchange", type: "(items: T[], detail) => void", description: "Final-order callback. Detail contains items, previousItems, item, itemId, fromIndex, toIndex, trigger and source. Missing source/target indices are -1. The detail type is not re-exported from the public package entry point." },
        { group: "SortableGroup", name: "children", type: "Snippet", description: "Lists sharing the group’s drag zone type." },

        {
            group: "SortableList",
            name: "items",
            type: "T[]",
            default: "[]",
            description:
                "Array of sortable items. Use <code>bind:items</code> for two-way binding.",
        },
        {
            group: "SortableList",
            name: "id",
            type: "string",
            default: "'default-list'",
            description:
                "Unique identifier. Required when used inside a <code>SortableGroup</code>.",
        },
        {
            group: "SortableList",
            name: "orientation",
            type: "'vertical' | 'horizontal' | 'grid'",
            default: "'vertical'",
            description: "Layout direction. <code>grid</code> uses a wrapping (<code>flex-wrap</code>) horizontal layout.",
        },
        {
            group: "SortableList",
            name: "item",
            type: "Snippet<[T]>",
            description: "(Required) Snippet used to render each item.",
        },
        {
            group: "SortableList",
            name: "previewOffset",
            type: "(args: { container: HTMLElement }) => { x: number; y: number }",
            description:
                "Accepted for compatibility but not used by SortableList in 0.0.34. Native preview offset helpers belong to the separate dnd action API.",
        },
        {
            group: "SortableList",
            name: "dragHandleSelector",
            type: "string",
            description:
                "CSS selector for a drag handle inside each item. When provided, drag can only be initiated from the matching element — the rest of the item remains interactive. E.g. <code>'[data-drag-handle]'</code> or <code>'.handle'</code>.",
        },
        {
            group: "SortableList",
            name: "grabbedClass",
            type: "string",
            description:
                "Classes merged onto the dragged element’s first child. Defaults to shadow-xl opacity-95 scale-[1.01]. E.g. <code>'rotate-3 scale-105 shadow-xl'</code>. This styles the engine’s dragged element, not the separate Pragmatic DnD preview.",
        },
        {
            group: "SortableList",
            name: "dropIndicator",
            type: "Snippet<[T | undefined]>",
            description:
                "Renders the engine’s shadow item in place of the item snippet. Typed as T | undefined; custom fields may be available, but its id is an engine placeholder. Without this snippet the normal item renderer is used.",
        },
        {
            group: "SortableList",
            name: "empty",
            type: "{ icon, title, description? }",
            description:
                "Renders an <code>EmptyState</code> when <code>items</code> is empty. <code>icon</code> and <code>title</code> are required; <code>description</code> is optional.",
        },
        {
            group: "SortableList",
            name: "class",
            type: "string",
            description: "Additional Tailwind classes on the list container.",
        },
        {
            group: "SortableGroup",
            name: "rules",
            type: "GroupRules",
            description:
                "Legacy target-list rules ({ [listId]: { accepts: string[] | boolean } }). Not enforced by SortableList in 0.0.34.",
        },
        {
            group: "SortableGroup",
            name: "typeField",
            type: "string",
            default: "'type'",
            description:
                "Legacy item type field. Not evaluated by SortableList in 0.0.34.",
        },
        {
            group: "SortableGroup",
            name: "class",
            type: "string",
            description: "Additional Tailwind classes on the group container.",
        },
    ];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Drag and Drop</ProseTitle>
		<ProseText>
		    Declarative, data-driven drag and drop components for sortable lists and
		    Kanban-style layouts. Built on <DocInlineCode
		        >svelte-dnd-action</DocInlineCode
		    > with Svelte 5 runes.
		</ProseText>
		<ProseText>
            Each item needs a stable, unique string or number <DocInlineCode>id</DocInlineCode>.
            IDs must be unique across all lists in a group. Give independent lists unique list IDs too: ungrouped lists with matching IDs share the same engine zone type. Pointer and keyboard sorting update
            <DocInlineCode>bind:items</DocInlineCode> on finalize; <DocInlineCode>onchange</DocInlineCode>
            runs only when the finalized ID order differs from its previous snapshot. Pointer dragging finalizes on drop; keyboard arrow moves finalize immediately, so keyboard persistence may run more than once during a grab.
        </ProseText>
        <ProseText>
            Version 0.0.34 limitation: <DocInlineCode>SortableGroup</DocInlineCode> shares a zone type,
            but its <DocInlineCode>rules</DocInlineCode> and <DocInlineCode>typeField</DocInlineCode>
            are not consumed by the current <DocInlineCode>SortableList</DocInlineCode> implementation.
            Do not rely on them to reject cross-list moves.
        </ProseText>

		<DocApiBlock title="API">
		    <DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Simple List</ProseTitle>
		        <ProseText>
		            <DocInlineCode>SortableList</DocInlineCode> renders a one-dimensional sortable
		            list. Item order can be changed by dragging; <DocInlineCode
		                >bind:items</DocInlineCode
		            > keeps state in sync automatically.
		        </ProseText>
		        <DocShowExample component={ListExample} code={listExample} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Kanban Board</ProseTitle>
		        <ProseText>
		            <DocInlineCode>SortableGroup</DocInlineCode> connects multiple <DocInlineCode
		                >SortableList</DocInlineCode
		            > instances, enabling items to be moved between columns. The <DocInlineCode
		                >items</DocInlineCode
                    > binding on each list stores its final order. This board accepts both tasks and bugs
                    in every column; group rules are not enforced in 0.0.34.
		        </ProseText>
		        <DocShowExample component={KanbanExample} code={kanbanExample} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Drag Handle</ProseTitle>
		        <ProseText>
		            <DocInlineCode>dragHandleSelector</DocInlineCode> restricts drag initiation to a
		            specific element inside each item. Set the selector on the list and add a
		            matching attribute (e.g. <DocInlineCode>data-drag-handle</DocInlineCode>) to your
		            handle element. The rest of the item — inputs, buttons, text — remains fully
		            interactive and will never accidentally start a drag.
		        </ProseText>
		        <DocShowExample component={DragHandleExample} code={dragHandleExample} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Horizontal List</ProseTitle>
		        <ProseText>
		            <DocInlineCode>orientation="horizontal"</DocInlineCode> switches the layout to
		            left-to-right. The drop indicator and sort logic adapt automatically.
		        </ProseText>
		        <DocShowExample component={HorizontalExample} code={horizontalExample} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Grid Layout</ProseTitle>
		        <ProseText>
		            <DocInlineCode>orientation="grid"</DocInlineCode> produces a wrapping (<DocInlineCode
		                >flex-wrap</DocInlineCode
		            >) horizontal layout — ideal for fixed-width items such as files or cards.
		        </ProseText>
		        <DocShowExample component={GridExample} code={gridExample} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom Drop Indicator</ProseTitle>
		        <ProseText>
		            The <DocInlineCode>dropIndicator</DocInlineCode> snippet gives full control over
		            the indicator's appearance. It receives the engine’s shadow item (typed as item or undefined), so the
		            indicator can reflect the item's own color or type. The snippet replaces the shadow item’s content while dragging; the wrapper still participates in the sortable layout.
		        </ProseText>
		        <DocShowExample component={CustomIndicatorExample} code={customIndicatorExample} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Grabbed Item Style</ProseTitle>
		        <ProseText>
		            <DocInlineCode>grabbedClass</DocInlineCode> applies Tailwind classes to the drag
		            element’s first child — tilt, scale, shadow, opacity, or any combination. This uses the sortable engine’s element transform, not the native-preview helpers.
		        </ProseText>
		        <DocShowExample component={GrabbedClassExample} code={grabbedClassExample} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Empty State</ProseTitle>
		        <ProseText>
		            The <DocInlineCode>empty</DocInlineCode> prop renders an <DocInlineCode
		                >EmptyState</DocInlineCode
		            > when the list has no items. Particularly useful in Kanban layouts where
		            a column can become empty during a drag session. <DocInlineCode>icon</DocInlineCode>
		            and <DocInlineCode>title</DocInlineCode> are required; <DocInlineCode
		                >description</DocInlineCode
		            > is optional.
		        </ProseText>
		        <DocShowExample component={EmptyStateExample} code={emptyStateExample} />
	</ProseParagraph>
    <ProseDivider />
    <ProseParagraph>
        <ProseTitle level={3}>Finalized changes and keyboard sorting</ProseTitle>
        <ProseText>Use onchange to persist finalized changes or inspect movement metadata. Press Space or Enter to pick up a focused item, use arrows to move it, then Space, Enter or Escape to end the grab. In the installed engine, Escape drops at the current position; it does not restore the original order. Arrow moves emit finalize events immediately.</ProseText>
        <DocShowExample component={ChangeExample} code={changeExample} />
    </ProseParagraph>
    <ProseDivider />
    <ProseParagraph>
        <ProseTitle level={3}>Low-level native drag actions</ProseTitle>
        <ProseText>The separate dnd actions use Pragmatic DnD, not the SortableList engine. They do not reorder arrays or interoperate with sortable zones automatically. Supply data, canDrop and event callbacks to implement your own native-pointer behavior.</ProseText>
        <DocShowExample component={ActionsExample} code={actionsExample} />
    </ProseParagraph>
    <ProseDivider />
    <ProseParagraph>
        <ProseTitle level={3}>Standalone indicators</ProseTitle>
        <ProseText>DropSlot is a visual insertion slot driven by atIndex and insertIndex. DropIndicator registers a native drop target with <DocInlineCode>{'{ type: "list-indicator", listId }'}</DocInlineCode>; it delegates events to your callbacks. Neither is used internally by SortableList in 0.0.34, and neither moves data by itself.</ProseText>
        <DocShowExample component={IndicatorsExample} code={indicatorsExample} />
    </ProseParagraph>
</ProsePage>
