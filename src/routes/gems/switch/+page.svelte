<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable from "../../../components/doc/ApiTable.svelte";
	import type { PropDef } from "../../../components/doc/ApiTable.svelte";

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
		{ name: 'value', type: 'boolean', description: 'Bindable boolean value of the switch.' },
		{ name: 'label', type: 'string | { on: string; off: string }', description: 'Label shown beside the switch. Pass an object to show different text for each state.' },
		{ name: 'icons', type: '{ on: IconDefinition; off: IconDefinition }', description: 'Icons rendered inside the thumb for each state. Only visible at normal size.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<DocTitle>Switch</DocTitle>
<DocText>A toggle switch for boolean values. Supports labels, per-state icons, and three sizes.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Bind <InlineCode>value</InlineCode> to track the switch state.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>With Label</DocSubtitle>
		<DocText>Pass a string to <InlineCode>label</InlineCode> for a static label beside the switch.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
	<div>
		<DocSubtitle>Dynamic Labels</DocSubtitle>
		<DocText>Pass <InlineCode>{"{ on, off }"}</InlineCode> to show different labels per state — both strings are rendered in a stacked grid and cross-faded.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
	<div>
		<DocSubtitle>With Icons</DocSubtitle>
		<DocText>Pass <InlineCode>icons</InlineCode> to render icons inside the thumb. Icons are only shown at normal size.</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example5} code={example5}/>
	</div>
	<div>
		<DocSubtitle>Disabled</DocSubtitle>
		<DocText>The <InlineCode>disabled</InlineCode> prop makes the switch inert and visually dimmed.</DocText>
		<ShowExample component={Example6} code={example6}/>
	</div>
</div>
