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

	const props: PropDef[] = [
		{ name: 'keys', type: 'string | string[]', description: 'A single key string, or an array of keys. Multiple keys are rendered with a <code>+</code> separator.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the wrapper span.' },
	];
</script>

<DocTitle>Kbd</DocTitle>
<DocText>Renders keyboard shortcut keys styled as physical keycaps. Pass a single key or an array for combos like <InlineCode>⌘K</InlineCode> or <InlineCode>Ctrl+Shift+P</InlineCode>.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Single Keys & Combos</DocSubtitle>
		<DocText>A single string renders one key. An array renders each key separated by <InlineCode>+</InlineCode>.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
</div>
