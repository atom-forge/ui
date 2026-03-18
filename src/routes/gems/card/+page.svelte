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
	import Example2 from "./examples/Example2.svelte"; // Új példa importálása
	import example2 from "./examples/Example2.svelte?raw"; // Új példa raw kódja

	const cardProps: PropDef[] = [
		{ name: 'children', type: 'Snippet', description: 'The content to be rendered inside the card.' },
		{ name: 'elevate', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '1', description: 'Controls the shadow level of the card. Corresponds to Tailwind CSS shadow classes (e.g., 1 for shadow-sm, 6 for shadow-2xl).' }
	];
</script>

<DocTitle>Card</DocTitle>
<DocText>A flexible content container with a distinct background, border, and shadow.</DocText>

<ApiBlock title="Card Props">
	<ApiTable props={cardProps} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>A simple card with some text content.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Elevation Levels</DocSubtitle>
		<DocText>Use the <InlineCode>elevate</InlineCode> prop to control the shadow intensity of the card.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
</div>
