<script lang="ts">
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import type { PropDef } from "../../../components/doc/ApiTable.svelte";
	import ApiTable from "../../../components/doc/ApiTable.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		{ name: 'value', type: 'string', default: '#ffffff', description: 'Bindable hex color value.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: '—', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: '—', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<DocTitle>Color Picker</DocTitle>
<DocText>A styled color picker that opens the browser's native color selection UI. Displays a swatch and the current hex value.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Bind <InlineCode>value</InlineCode> to track the selected color.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Disabled</DocSubtitle>
		<DocText>The <InlineCode>disabled</InlineCode> prop makes the picker inert and visually dimmed.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
</div>
