<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";
	import Example4 from "./examples/Example4.svelte";
	import example4 from "./examples/Example4.svelte?raw";
	import Example5 from "./examples/Example5.svelte";
	import example5 from "./examples/Example5.svelte?raw";
	import Example6 from "./examples/Example6.svelte";
	import example6 from "./examples/Example6.svelte?raw";

	const props: PropDef[] = [
		{ name: 'value', type: 'boolean', default: 'false', description: 'Bindable boolean value. Mutually exclusive with <code>checked</code>.' },
				{ name: 'checked', type: 'boolean', description: 'Bindable alias for value. Initialize it to a boolean before binding; alias mode is selected on component creation.' },
				{ name: 'onchange', type: '(checked: boolean) => void', description: 'Called with the new boolean after user interaction.' },
				{ name: 'class', type: 'string', description: 'Extra classes on the wrapper label.' },
		{ name: 'label', type: 'string | { on: string; off: string }', description: 'Label shown beside the switch. Pass an object to show different text for each state.' },
		{ name: 'icons', type: '{ on: IconDefinition; off: IconDefinition }', description: 'Icons rendered inside the thumb for each state. Only visible at normal size.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Switch</ProseTitle>
		<ProseText>A toggle switch for boolean values. Supports labels, per-state icons, and three sizes.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Bind <DocInlineCode>value</DocInlineCode> to track the switch state.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Label</ProseTitle>
				<ProseText>Pass a string to <DocInlineCode>label</DocInlineCode> for a static label beside the switch.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Dynamic Labels</ProseTitle>
				<ProseText>Pass <DocInlineCode>{"{ on, off }"}</DocInlineCode> to show different labels per state — both strings are rendered in a stacked grid and cross-faded.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Icons</ProseTitle>
				<ProseText>Pass <DocInlineCode>icons</DocInlineCode> to render icons inside the thumb. Icons are only shown at normal size.</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example5} code={example5}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled</ProseTitle>
				<ProseText>The <DocInlineCode>disabled</DocInlineCode> prop makes the switch inert and visually dimmed.</ProseText>
				<DocShowExample component={Example6} code={example6}/>
	</ProseParagraph>
</ProsePage>
