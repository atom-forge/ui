<script lang="ts">
    import ShowExample from "../../../components/doc/ShowExample.svelte";
    import "svelte-highlight/styles/tokyo-night-dark.css";
    import InlineCode from "../../../components/doc/InlineCode.svelte";
    import DocTitle from "../../../components/doc/DocTitle.svelte";
    import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
    import DocText from "../../../components/doc/DocText.svelte";
    import ApiBlock from "../../../components/doc/ApiBlock.svelte";
    import ApiTable from "../../../components/doc/ApiTable.svelte";
    import type { PropDef } from "../../../components/doc/ApiTable.svelte";

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

    const props: PropDef[] = [
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
            type: "GetOffsetFn",
            description:
                "Controls cursor position relative to the drag preview — <code>(args: { container }) => { x, y }</code>. <code>{ x: 0, y: 0 }</code> places the cursor at the preview's top-left corner. Defaults to slightly below and to the right of the cursor, with automatic compensation when <code>grabbedClass</code> is set.",
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
                "Tailwind classes applied to the drag preview clone while dragging. E.g. <code>'rotate-3 scale-105 shadow-xl'</code>. The original item is not affected.",
        },
        {
            group: "SortableList",
            name: "dropIndicator",
            type: "Snippet<[T | undefined]>",
            description:
                "Optional snippet for a custom drop indicator. Receives the currently dragged item (<code>T | undefined</code>), enabling item-dependent styling. Falls back to the default indicator when not provided.",
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
                "Optional ruleset controlling which items can be moved between lists. See the type definition for details.",
        },
        {
            group: "SortableGroup",
            name: "typeField",
            type: "string",
            default: "'type'",
            description:
                "Field name on each item used to determine its type for <code>rules</code> evaluation.",
        },
        {
            group: "SortableGroup",
            name: "class",
            type: "string",
            description: "Additional Tailwind classes on the group container.",
        },
    ];
</script>

<DocTitle>Drag and Drop</DocTitle>
<DocText>
    Declarative, data-driven drag and drop components for sortable lists and
    Kanban-style layouts. Built on <InlineCode
        >@atlaskit/pragmatic-drag-and-drop</InlineCode
    > with Svelte 5 runes.
</DocText>
<DocText>
    The drop indicator always appears exactly where the item will land —
    <InlineCode>insertIndex</InlineCode> is the single source of truth on drop:
    regardless of where you release (gap, indicator, or empty area), the item always
    ends up where the indicator was shown.
</DocText>

<ApiBlock title="API">
    <ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
    <div>
        <DocSubtitle>Simple List</DocSubtitle>
        <DocText>
            <InlineCode>SortableList</InlineCode> renders a one-dimensional sortable
            list. Item order can be changed by dragging; <InlineCode
                >bind:items</InlineCode
            > keeps state in sync automatically.
        </DocText>
        <ShowExample component={ListExample} code={listExample} />
    </div>

    <div>
        <DocSubtitle>Kanban Board</DocSubtitle>
        <DocText>
            <InlineCode>SortableGroup</InlineCode> connects multiple <InlineCode
                >SortableList</InlineCode
            > instances, enabling items to be moved between columns. The <InlineCode
                >rules</InlineCode
            > prop controls which list accepts which item types — in this example
            the <code>todo</code> column only accepts <InlineCode>task</InlineCode>
            items; <InlineCode>bug</InlineCode> items cannot be dropped there.
        </DocText>
        <ShowExample component={KanbanExample} code={kanbanExample} />
    </div>

    <div>
        <DocSubtitle>Drag Handle</DocSubtitle>
        <DocText>
            <InlineCode>dragHandleSelector</InlineCode> restricts drag initiation to a
            specific element inside each item. Set the selector on the list and add a
            matching attribute (e.g. <InlineCode>data-drag-handle</InlineCode>) to your
            handle element. The rest of the item — inputs, buttons, text — remains fully
            interactive and will never accidentally start a drag.
        </DocText>
        <ShowExample component={DragHandleExample} code={dragHandleExample} />
    </div>

    <div>
        <DocSubtitle>Horizontal List</DocSubtitle>
        <DocText>
            <InlineCode>orientation="horizontal"</InlineCode> switches the layout to
            left-to-right. The drop indicator and sort logic adapt automatically.
        </DocText>
        <ShowExample component={HorizontalExample} code={horizontalExample} />
    </div>

    <div>
        <DocSubtitle>Grid Layout</DocSubtitle>
        <DocText>
            <InlineCode>orientation="grid"</InlineCode> produces a wrapping (<InlineCode
                >flex-wrap</InlineCode
            >) horizontal layout — ideal for fixed-width items such as files or cards.
        </DocText>
        <ShowExample component={GridExample} code={gridExample} />
    </div>

    <div>
        <DocSubtitle>Custom Drop Indicator</DocSubtitle>
        <DocText>
            The <InlineCode>dropIndicator</InlineCode> snippet gives full control over
            the indicator's appearance. It receives the currently dragged item, so the
            indicator can reflect the item's own color or type. The snippet is only
            mounted while a drag is active — no extra DOM nodes at rest.
        </DocText>
        <ShowExample component={CustomIndicatorExample} code={customIndicatorExample} />
    </div>

    <div>
        <DocSubtitle>Grabbed Item Style</DocSubtitle>
        <DocText>
            <InlineCode>grabbedClass</InlineCode> applies Tailwind classes to the drag
            preview clone — tilt, scale, shadow, opacity, or any combination. Only the
            native drag preview is affected; the original item stays unchanged.
        </DocText>
        <ShowExample component={GrabbedClassExample} code={grabbedClassExample} />
    </div>

    <div>
        <DocSubtitle>Empty State</DocSubtitle>
        <DocText>
            The <InlineCode>empty</InlineCode> prop renders an <InlineCode
                >EmptyState</InlineCode
            > when the list has no items. Particularly useful in Kanban layouts where
            a column can become empty during a drag session. <InlineCode>icon</InlineCode>
            and <InlineCode>title</InlineCode> are required; <InlineCode
                >description</InlineCode
            > is optional.
        </DocText>
        <ShowExample component={EmptyStateExample} code={emptyStateExample} />
    </div>
</div>
