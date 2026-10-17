<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1Raw from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2Raw from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3Raw from "./examples/Example3.svelte?raw";

	import ControlsExample from "./examples/ControlsExample.svelte";
    import controlsExample from "./examples/ControlsExample.svelte?raw";

    const props: PropDef[] = [
        { group: 'Table', name: 'rowClick', type: '(row: T, table: T[], index: number, event: MouseEvent | KeyboardEvent) => void', description: 'Activates rows on click, Enter or Space. Makes rows focusable. Interactive descendants and data-table-row-click-ignore targets are excluded.' },
        { group: 'Table', name: 'frameless', type: 'boolean', default: 'false', description: 'Removes the outer border and rounded frame.' },
        { group: 'Table', name: 'hideHeader', type: 'boolean', default: 'false', description: 'Hides the table header.' },
        { group: 'Table', name: 'noScroll', type: 'boolean', default: 'false', description: 'Fits columns horizontally using relative sizing weights and fixed table layout, even with layout=auto. Vertical scrolling remains enabled. Fixed columns receive protected width priority.' },
        { group: 'Table', name: 'layout', type: "'fixed' | 'auto'", default: "'fixed'", description: 'CSS table-layout mode. noScroll forces fixed layout.' },
        { group: 'Table', name: 'overflow', type: "'ellipsis' | 'wrap' | 'clip'", default: "'ellipsis'", description: 'Default cell overflow policy. Column overflow overrides this.' },
        { group: 'Table', name: 'headerClass', type: 'string', description: 'Classes merged onto every header cell.' },
        { group: 'Table', name: 'class', type: 'string', description: 'Classes on the outer table container.' },
        { group: 'ColumnDef<T>', name: 'width / minWidth / maxWidth', type: 'string', description: 'CSS sizing values for the column.' },
        { group: 'ColumnDef<T>', name: 'overflow', type: "'ellipsis' | 'wrap' | 'clip'", description: 'Per-column cell overflow override.' },
        { group: 'StylingResult', name: 'class / style', type: 'string', description: 'Styling functions may return either a class string or { class?, style? }. Inline styles support the row bar-chart helper.' },
        { group: 'TableSettings', name: 'columns', type: 'ColumnDef<T>[]', description: 'Bindable columns. Hides fixed columns from the settings list and mutates visibility before invoking onToggleColumn.' },
        { group: 'TableSettings', name: 'onToggleColumn', type: '(key: keyof T) => void', description: 'Required notification callback, not a request to toggle again. Clone the array to publish the already changed visibility if needed.' },
		// Table
		{ group: 'Table', name: 'data', type: 'T[]', description: 'Array of data objects to display.' },
		{ group: 'Table', name: 'columns', type: 'ColumnDef<T>[]', description: 'Column definitions. Bindable — the component may mutate visibility.' },
		{ group: 'Table', name: 'rowStyle', type: 'string | StylingFn<T>', description: 'Class string or function applied to each <code>&lt;tr&gt;</code>. A function receives <code>(row, tableData, index)</code>.' },
		{ group: 'Table', name: 'columnsEditable', type: 'boolean', default: 'false', description: 'Opens the built-in header context popup. In 0.0.34 its callback toggles visibility a second time after TableSettings has already mutated it; prefer an external TableSettings snippet for working visibility changes.' },

		// ColumnDef
		{ group: 'ColumnDef<T>', name: 'key', type: 'keyof T', description: 'Data key to read from the row object.' },
		{ group: 'ColumnDef<T>', name: 'label', type: 'string', description: 'Header text for the column.' },
		{ group: 'ColumnDef<T>', name: 'fixed', type: 'boolean', default: 'false', description: 'Prevents the column from being hidden when <code>columnsEditable</code> is on.' },
		{ group: 'ColumnDef<T>', name: 'visible', type: 'boolean', default: 'true', description: 'Initial visibility of the column.' },
		{ group: 'ColumnDef<T>', name: 'style', type: 'ColumnStyling<T>', description: 'Per-column styling for header and cells.' },
		{ group: 'ColumnDef<T>', name: 'formatter', type: '(row: T, table: T[], index: number) => string | number', description: 'Function that returns a formatted value for the cell. Mutually exclusive with <code>snippet</code>.' },
		{ group: 'ColumnDef<T>', name: 'snippet', type: 'Snippet<[T]>', description: 'Svelte snippet for fully custom cell rendering. Mutually exclusive with <code>formatter</code>.' },
		{ group: 'ColumnDef<T>', name: 'grow', type: 'true', description: 'Expands the column to fill all remaining horizontal space.' },
		{ group: 'ColumnDef<T>', name: 'shrink', type: 'true', description: 'Collapses the column to fit its content.' },

		// ColumnStyling
		{ group: 'ColumnStyling<T>', name: 'header', type: 'string', description: 'Tailwind classes applied to the <code>&lt;th&gt;</code> of this column.' },
		{ group: 'ColumnStyling<T>', name: 'cell', type: 'string | StylingFn<T>', description: 'Class string or <code>StylingFn</code> applied to each <code>&lt;td&gt;</code> in this column.' },

		// createRowBarChartStyle
		{ group: 'createRowBarChartStyle', name: 'row', type: 'T', description: 'The current row object.' },
		{ group: 'createRowBarChartStyle', name: 'tableData', type: 'T[]', description: 'Full table data — used to compute the maximum value.' },
		{ group: 'createRowBarChartStyle', name: 'config.values', type: 'Array<{ key: keyof T; color: string; opacity?: number }>', description: 'Bar segments to render. Each segment maps a numeric key to a color; <code>opacity</code> defaults to <code>0.1</code>.' },
		{ group: 'createRowBarChartStyle', name: 'config.height', type: 'string', default: "'100%'", description: 'CSS height of the bar (e.g. <code>"4px"</code> or <code>"100%"</code>).' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Table</ProseTitle>
		<ProseText>Configurable data table with fixed headers, optional column visibility toggling, flexible cell rendering, and row-level bar chart backgrounds.</ProseText>
				<ProseText>Column visibility caveat: the built-in columnsEditable popup double-toggles visible in 0.0.34. Use the external settings example below or <a href="/ui/data/table-settings">Table Settings</a> instead. Keep column objects reactive and shared; Table captures its initial columns array and does not synchronize replacement definitions after mount. hideHeader also removes the built-in popup trigger. grow and shrink are mutually exclusive true flags; formatter and snippet are mutually exclusive renderers.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Comprehensive Example</ProseTitle>
				<ProseText>Fixed and toggleable columns with all three cell rendering options: a <DocInlineCode>style.cell</DocInlineCode> function for Role, a <DocInlineCode>snippet</DocInlineCode> for Status, and a <DocInlineCode>formatter</DocInlineCode> for Last Login.</ProseText>
				<DocShowExample component={Example1} code={example1Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Row Bar Chart</ProseTitle>
				<ProseText>Use <DocInlineCode>rowStyle</DocInlineCode> with <DocInlineCode>createRowBarChartStyle</DocInlineCode> to render proportional horizontal bars as row backgrounds.</ProseText>
				<DocShowExample component={Example2} code={example2Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>External Column Settings</ProseTitle>
				<ProseText>Open <DocInlineCode>TableSettings</DocInlineCode> from an external button to control column visibility without right-click.</ProseText>
				<DocShowExample component={Example3} code={example3Raw}/>
	</ProseParagraph>
    <ProseDivider />
    <ProseParagraph>
        <ProseTitle level={3}>Sizing, overflow and row activation</ProseTitle>
        <ProseText>Use per-column widths and overflow overrides. This noScroll example fits columns using weighted widths and forces fixed layout despite layout=auto; vertical scrolling remains available. rowClick receives the row, full data, zero-based index and mouse or keyboard event. Fixed columns bypass cell overflow clipping in noScroll mode.</ProseText>
        <DocShowExample component={ControlsExample} code={controlsExample} />
    </ProseParagraph>
</ProsePage>
