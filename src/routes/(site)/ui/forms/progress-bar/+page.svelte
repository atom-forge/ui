<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ name: 'value', type: 'number', default: '0', description: 'Current progress value.' },
		{ name: 'max', type: 'number', default: '100', description: 'Maximum value. A nonpositive max produces zero fill; values are not clamped, so keep value between 0 and max.' },
				{ name: 'class', type: 'string', description: 'Extra classes on the track. Value is a one-way prop, not bindable.' },
		{ name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Progress Bar</ProseTitle>
		<ProseText>
			Visual indicator of task completion. The fill width is derived from <DocInlineCode>value</DocInlineCode> relative to <DocInlineCode>max</DocInlineCode>.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Pass a value and drive it with a <DocInlineCode>Slider</DocInlineCode> or any other input.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes available: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>
</ProsePage>
