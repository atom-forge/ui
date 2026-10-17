<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import PopupExample from '../table/examples/Example3.svelte';
	import popupExample from '../table/examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ name: 'columns', type: 'ColumnDef<T>[]', description: 'Required, bindable column definitions. Each non-fixed column renders a visibility control. Undefined visible is treated as true.' },
		{ name: 'onToggleColumn', type: '(key: keyof T) => void', description: 'Required notification callback. The component mutates the column’s visible field before invoking this callback. Do not toggle it again.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Table Settings</ProseTitle>
		<ProseText>Import <DocInlineCode>TableSettings</DocInlineCode> and <DocInlineCode>type ColumnDef</DocInlineCode> from <DocInlineCode>@atom-forge/ui</DocInlineCode>. This exported visibility panel works inline or inside a popup and is useful when a table has no header or right-click is inconvenient.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props} /></DocApiBlock>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Inline settings for a headerless table</ProseTitle>
		<ProseText>Share the same reactive column objects with Table. Initialize visible explicitly in this example. Fixed columns are omitted from the settings panel; fixed does not force a column with visible=false to become visible. TableSettings has no class or children prop in 0.0.34; use an outer wrapper for layout.</ProseText>
		<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Anchored popup</ProseTitle>
		<ProseText>Use a snippet so the popup and Table share the parent’s columns binding. The example publishes the already-mutated visibility with an array copy. The popup manager must be provided by Root; retrieve it during component initialization, not inside the click handler.</ProseText>
		<DocShowExample component={PopupExample} code={popupExample} />
		<ProseText>In the installed implementation, Table captures its initial column array. Prefer changing the shared reactive column objects rather than replacing all definitions after mount. See <a href="/ui/data/table">Table</a> for column sizing, row activation and formatting.</ProseText>
	</ProseParagraph>
</ProsePage>
