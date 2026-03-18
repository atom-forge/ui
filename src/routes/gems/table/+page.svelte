<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable, {type PropDef} from "../../../components/doc/ApiTable.svelte";

	import Example1 from "./examples/Example1.svelte";
	import example1Raw from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2Raw from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3Raw from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		// Table
		{ group: 'Table', name: 'data', type: 'T[]', description: 'Array of data objects to display.' },
		{ group: 'Table', name: 'columns', type: 'ColumnDef<T>[]', description: 'Column definitions. Bindable — the component may mutate visibility.' },
		{ group: 'Table', name: 'rowStyle', type: 'string | StylingFn<T>', description: 'Class string or function applied to each <code>&lt;tr&gt;</code>. A function receives <code>(row, tableData, index)</code>.' },
		{ group: 'Table', name: 'columnsEditable', type: 'boolean', default: 'false', description: 'Enables right-click on the header to toggle column visibility via a context popup.' },

		// ColumnDef
		{ group: 'ColumnDef<T>', name: 'key', type: 'keyof T', description: 'Data key to read from the row object.' },
		{ group: 'ColumnDef<T>', name: 'label', type: 'string', description: 'Header text for the column.' },
		{ group: 'ColumnDef<T>', name: 'fixed', type: 'boolean', default: 'false', description: 'Prevents the column from being hidden when <code>columnsEditable</code> is on.' },
		{ group: 'ColumnDef<T>', name: 'visible', type: 'boolean', default: 'true', description: 'Initial visibility of the column.' },
		{ group: 'ColumnDef<T>', name: 'style', type: 'ColumnStyling<T>', description: 'Per-column styling for header and cells.' },
		{ group: 'ColumnDef<T>', name: 'formatter', type: '(row: T, table: T[], index: number) => string | number', description: 'Function that returns a formatted value for the cell. Mutually exclusive with <code>snippet</code>.' },
		{ group: 'ColumnDef<T>', name: 'snippet', type: 'Snippet<[T]>', description: 'Svelte snippet for fully custom cell rendering. Mutually exclusive with <code>formatter</code>.' },
		{ group: 'ColumnDef<T>', name: 'grow', type: 'boolean', description: 'Expands the column to fill all remaining horizontal space.' },
		{ group: 'ColumnDef<T>', name: 'shrink', type: 'boolean', description: 'Collapses the column to fit its content.' },

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

<DocTitle>Table</DocTitle>
<DocText>Configurable data table with fixed headers, optional column visibility toggling, flexible cell rendering, and row-level bar chart backgrounds.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Comprehensive Example</DocSubtitle>
		<DocText>Fixed and toggleable columns with all three cell rendering options: a <InlineCode>style.cell</InlineCode> function for Role, a <InlineCode>snippet</InlineCode> for Status, and a <InlineCode>formatter</InlineCode> for Last Login.</DocText>
		<ShowExample component={Example1} code={example1Raw}/>
	</div>
	<div>
		<DocSubtitle>Row Bar Chart</DocSubtitle>
		<DocText>Use <InlineCode>rowStyle</InlineCode> with <InlineCode>createRowBarChartStyle</InlineCode> to render proportional horizontal bars as row backgrounds.</DocText>
		<ShowExample component={Example2} code={example2Raw}/>
	</div>
	<div>
		<DocSubtitle>External Column Settings</DocSubtitle>
		<DocText>Open <InlineCode>TableSettings</InlineCode> from an external button to control column visibility without right-click.</DocText>
		<ShowExample component={Example3} code={example3Raw}/>
	</div>
</div>
