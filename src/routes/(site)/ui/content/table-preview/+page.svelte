<script lang="ts">
	import { DocApiBlock, DocApiTable, DocShowExample, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import Example from './examples/Example.svelte';
	import code from './examples/Example.svelte?raw';

	const props: PropDef[] = [
		{ name: 'data', type: 'TableData | null', description: 'Required table data. Null or empty rows render nothing. Heading and sum flags, alignment, and decorators match TableEditor.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Table Preview</ProseTitle>
		<ProseText>Read-only rendering of TableEditor data, including heading cells, totals styling, and column decorators. Totals are stored cell values, not calculated formulas. Use sumDecorator to show currency or unit decorators on totals.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props} /></DocApiBlock>
	</ProseParagraph>
	<ProseParagraph><DocShowExample component={Example} {code} /></ProseParagraph>
</ProsePage>
