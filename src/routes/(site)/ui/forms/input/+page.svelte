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
	import Example7 from "./examples/Example7.svelte";
	import example7 from "./examples/Example7.svelte?raw";

	const props: PropDef[] = [
		{ name: 'value', type: 'string', default: "''", description: 'Bindable input value.' },
		{ name: 'type', type: "'text' | 'integer' | 'float' | 'password'", default: "'text'", description: '<code>integer</code> and <code>float</code> strip invalid characters on input. <code>password</code> adds a reveal toggle button.' },
		{ name: 'placeholder', type: 'string', description: 'Placeholder text shown when empty.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Applies error styling (red border and text).' },
		{ name: 'monospace', type: 'boolean', default: 'false', description: 'Applies a monospace font.' },
		{ name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },
		{ name: 'icon', type: 'IconDefinition', description: 'Icon displayed inside the input on the left.' },
		{ name: 'prefix', type: 'string | Snippet', description: 'Content shown before the input field, separated by a border.' },
		{ name: 'suffix', type: 'string | Snippet', description: 'Content shown after the input field, separated by a border.' },
		{ name: 'oninput', type: '(event: Event) => void', description: 'Called on every input, after <code>integer</code>/<code>float</code> filtering has updated the value.' },
				{ name: 'class', type: 'string', description: 'Extra classes on the outer wrapper. Additional HTML attributes such as id and name are forwarded to the native input.' },
				{ name: 'focus()', type: '() => void', description: 'Exported method, available via bind:this, to focus the native input.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Input</ProseTitle>
		<ProseText>Text-based form input. Supports numeric formatting, password reveal, icons, and prefix/suffix slots.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Bind <DocInlineCode>value</DocInlineCode> to track input.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Types</ProseTitle>
				<ProseText><DocInlineCode>integer</DocInlineCode> and <DocInlineCode>float</DocInlineCode> strip non-numeric characters as you type. <DocInlineCode>password</DocInlineCode> adds an eye toggle.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>States</ProseTitle>
				<ProseText><DocInlineCode>disabled</DocInlineCode> makes the input inert; <DocInlineCode>invalid</DocInlineCode> applies error styling.</ProseText>
				<DocShowExample component={Example4} code={example4} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Icon</ProseTitle>
				<ProseText>Pass an <DocInlineCode>icon</DocInlineCode> to display it inside the field on the left.</ProseText>
				<DocShowExample component={Example5} code={example5} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Prefix & Suffix</ProseTitle>
				<ProseText>Attach a string or snippet before or after the field.</ProseText>
				<DocShowExample component={Example6} code={example6} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Monospace</ProseTitle>
				<ProseText>Use <DocInlineCode>monospace</DocInlineCode> for code, numbers, or fixed-width content.</ProseText>
				<DocShowExample component={Example7} code={example7} />
	</ProseParagraph>
</ProsePage>
