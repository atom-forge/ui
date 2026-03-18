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
		{ name: 'children', type: 'Snippet', description: 'Content rendered inside the chip.' },
		{ name: 'color', type: "'base' | 'green' | 'red' | 'blue' | 'yellow'", default: "'base'", description: 'Color variant of the chip.' },
		{ name: 'icon', type: 'IconDefinition', description: 'Icon rendered at the start. Ignored if <code>start</code> is provided.' },
		{ name: 'start', type: 'Snippet', description: 'Custom snippet rendered at the start, replacing the <code>icon</code> shorthand.' },
		{ name: 'end', type: 'Snippet', description: 'Custom snippet rendered at the end.' },
	];
</script>

<DocTitle>Chip</DocTitle>
<DocText>A small inline label used for categorization, status, or keywords. Supports color variants, icons, and custom start/end snippets.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Colors & Icons</DocSubtitle>
		<DocText>Five color variants: <InlineCode>base</InlineCode>, <InlineCode>green</InlineCode>, <InlineCode>blue</InlineCode>, <InlineCode>yellow</InlineCode>, <InlineCode>red</InlineCode>. Add an <InlineCode>icon</InlineCode> for visual reinforcement.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
</div>
