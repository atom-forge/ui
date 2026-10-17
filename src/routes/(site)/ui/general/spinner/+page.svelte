<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';

	const props: PropDef[] = [
		{ name: 'class', type: 'string', default: "''", description: 'SVG classes. Set width and height explicitly; text color controls the strokes through currentColor.' },
		{ name: 'SVG attributes', type: 'AnyProp', description: 'Other attributes such as aria-hidden, role, and aria-label are forwarded to the SVG.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Spinner</ProseTitle>
		<ProseText>A publicly exported animated SVG for indeterminate activity. It is the same helper used inside <DocInlineCode>Button</DocInlineCode> loading states. Spinner has no size, loading, or label prop: compose those concerns in the surrounding UI.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props}/></DocApiBlock>
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Sizes, colors, and loading announcements</ProseTitle>
		<ProseText>Use width/height classes to size the spinner and text classes to set its color. Put descriptive text in a status region and hide the decorative SVG from screen readers. Use Button's loading prop rather than manually composing a spinner when the action should also be disabled.</ProseText>
		<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>
</ProsePage>
