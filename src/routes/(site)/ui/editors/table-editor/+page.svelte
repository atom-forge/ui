<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3Raw from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props',   name: 'value',    type: 'TableData',                        default: 'makeDefaultTableData()', description: 'Initial and externally synchronized table state. Although declared bindable, this release emits edits through <code>onchange</code> rather than assigning <code>value</code>. Contains rows, column styles, and heading/sum toggles.' },
		{ group: 'Props',   name: 'onchange', type: '(v: TableData) => void',           description: 'Called after every edit — cell change, row/column add/remove, toggle, or style update.' },
		{ group: 'Types',   name: 'TableData', type: '{ rows: string[][]; colStyles: ColStyle[]; headingRow: boolean; headingCol: boolean; sumRow: boolean; sumCol: boolean }', description: 'Full table state. <code>rows</code> is a 2-D string array. <code>colStyles</code> has one entry per column.' },
		{ group: 'Types',   name: 'ColStyle',  type: "{ align: 'left' | 'center' | 'right'; prefix: string; postfix: string; sumDecorator: boolean }",                                               description: 'Per-column visual style. <code>prefix</code> and <code>postfix</code> are rendered as non-editable decorators around the cell value (e.g. <code>$</code>, <code>%</code>).' },
		{ group: 'Factory', name: 'makeDefaultTableData()', type: 'TableData',          description: 'Creates a 4×4 table with empty cells and default left-aligned column styles. Import alongside the component.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Table Editor</ProseTitle>
		<ProseText>
			An interactive spreadsheet-style editor. Supports heading and sum row/column markers,
			per-column alignment and prefix/postfix decorators, and full keyboard navigation.
			Designed to be used standalone or embedded inside the Block Editor.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
				<ProseText>
					Call <DocInlineCode>makeDefaultTableData()</DocInlineCode> to get a blank 4×4 table and pass it as <DocInlineCode>value</DocInlineCode>. Update parent state in <DocInlineCode>onchange</DocInlineCode>.
					Hover over a row or column to reveal insert and delete controls.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Heading row & sum row</ProseTitle>
				<ProseText>
					Toggle <DocInlineCode>headingRow</DocInlineCode> / <DocInlineCode>headingCol</DocInlineCode> to style the first row or column as a header.
					Toggle <DocInlineCode>sumRow</DocInlineCode> / <DocInlineCode>sumCol</DocInlineCode> to highlight the last row or column as a totals band.
					Combine with <DocInlineCode>prefix</DocInlineCode> decorators (e.g. <DocInlineCode>$</DocInlineCode>) for financial tables.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Controlled with data state</ProseTitle>
				<ProseText>
					Use the <DocInlineCode>onchange</DocInlineCode> callback instead of <DocInlineCode>bind:value</DocInlineCode>
					when you need to observe or persist changes. The editor commits edits internally before calling the callback; this is not a validation veto.
				</ProseText>
				<DocShowExample component={Example3} code={example3Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Keyboard navigation</ProseTitle>
				<ProseText>
					Full keyboard control inside the table:
					<DocInlineCode>Tab</DocInlineCode> / <DocInlineCode>Shift+Tab</DocInlineCode> move between cells left and right, wrapping to the next/previous row.
					<DocInlineCode>Enter</DocInlineCode> and <DocInlineCode>↓</DocInlineCode> move down a row.
					<DocInlineCode>↑</DocInlineCode> moves up.
					<DocInlineCode>→</DocInlineCode> / <DocInlineCode>←</DocInlineCode> jump to the adjacent cell when the cursor is at the end or start of the input.
				</ProseText>
	</ProseParagraph>
</ProsePage>
