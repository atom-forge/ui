<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable, { type PropDef } from "../../../components/doc/ApiTable.svelte";

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
	];
</script>

<DocTitle>Input</DocTitle>
<DocText>Text-based form input. Supports numeric formatting, password reveal, icons, and prefix/suffix slots.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Bind <InlineCode>value</InlineCode> to track input.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Types</DocSubtitle>
		<DocText><InlineCode>integer</InlineCode> and <InlineCode>float</InlineCode> strip non-numeric characters as you type. <InlineCode>password</InlineCode> adds an eye toggle.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
	<div>
		<DocSubtitle>States</DocSubtitle>
		<DocText><InlineCode>disabled</InlineCode> makes the input inert; <InlineCode>invalid</InlineCode> applies error styling.</DocText>
		<ShowExample component={Example4} code={example4} />
	</div>
	<div>
		<DocSubtitle>Icon</DocSubtitle>
		<DocText>Pass an <InlineCode>icon</InlineCode> to display it inside the field on the left.</DocText>
		<ShowExample component={Example5} code={example5} />
	</div>
	<div>
		<DocSubtitle>Prefix & Suffix</DocSubtitle>
		<DocText>Attach a string or snippet before or after the field.</DocText>
		<ShowExample component={Example6} code={example6} />
	</div>
	<div>
		<DocSubtitle>Monospace</DocSubtitle>
		<DocText>Use <InlineCode>monospace</InlineCode> for code, numbers, or fixed-width content.</DocText>
		<ShowExample component={Example7} code={example7} />
	</div>
</div>
