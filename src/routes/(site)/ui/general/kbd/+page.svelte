<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";

	const props: PropDef[] = [
		{ name: 'keys', type: 'string | string[]', description: 'A single key string, or an array of keys. Multiple keys are rendered with a <code>+</code> separator.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the wrapper span.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Kbd</ProseTitle>
		<ProseText>Renders keyboard shortcut keys styled as physical keycaps. Pass a single key or an array for combos like <DocInlineCode>⌘K</DocInlineCode> or <DocInlineCode>Ctrl+Shift+P</DocInlineCode>.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Single Keys & Combos</ProseTitle>
				<ProseText>A single string renders one key. An array renders each key separated by <DocInlineCode>+</DocInlineCode>. The name <DocInlineCode>meta</DocInlineCode> resolves to ⌘ on Apple platforms and Ctrl otherwise; <DocInlineCode>cmd</DocInlineCode> always resolves to ⌘ and <DocInlineCode>ctrl</DocInlineCode> to Ctrl.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>
</ProsePage>
