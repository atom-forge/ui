<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		{ name: 'value', type: 'string', default: '#ffffff', description: 'Bindable hex color value.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
				{ name: 'class', type: 'string', description: 'Extra classes on the outer wrapper. Additional HTML attributes are forwarded to the wrapper, not the native color input.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: '—', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: '—', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Color Picker</ProseTitle>
		<ProseText>A styled color picker that opens the browser's native color selection UI. Displays a swatch and the current hex value.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Bind <DocInlineCode>value</DocInlineCode> to track the selected color.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled</ProseTitle>
				<ProseText>The <DocInlineCode>disabled</DocInlineCode> prop makes the picker inert and visually dimmed.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>
</ProsePage>
