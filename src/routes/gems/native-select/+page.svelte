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

	const props: PropDef[] = [
		{ name: 'options', type: 'Array<{ value, label }>', description: 'List of options to render.' },
		{ name: 'value', type: 'any', description: 'Bindable value of the selected option.' },
		{ name: 'placeholder', type: 'string', default: "'Select an option'", description: 'Shown when no option is selected. Rendered as a disabled first option.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
		{ name: 'borderless', type: 'boolean', default: 'false', description: 'Removes the border and makes the background transparent.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: '—', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: '—', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<DocTitle>Native Select</DocTitle>
<DocText>A styled wrapper around the browser's native <InlineCode>&lt;select&gt;</InlineCode> element. Uses an invisible overlay technique — the native select is fully transparent and positioned over a custom-styled display.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Bind <InlineCode>value</InlineCode> to track the selected option.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Borderless</DocSubtitle>
		<DocText>Use <InlineCode>borderless</InlineCode> to remove the border and background — useful inside toolbars or tables.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>

	<div>
		<DocSubtitle>Disabled</DocSubtitle>
		<DocText>The <InlineCode>disabled</InlineCode> prop makes the select inert and visually dimmed.</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>
</div>
