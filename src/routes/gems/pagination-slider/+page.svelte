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

	const props: PropDef[] = [
		{ group: 'State', name: 'page', type: 'number', default: '1', description: 'Current page (1-indexed). Use <code>bind:page</code> for two-way binding.' },
		{ group: 'Data', name: 'total', type: 'number', description: 'Total number of items.' },
		{ group: 'Data', name: 'pageSize', type: 'number', description: 'Number of items per page. Determines the total page count.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — h-8 buttons, compact slider.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small size — h-6 buttons, small slider.' },
		{ group: 'Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes on the wrapper.' },
	];
</script>

<DocTitle>Pagination Slider</DocTitle>
<DocText>A slider-based pagination control. Ideal for large datasets where the exact page number matters less than the position. Shows prev/next buttons, a draggable slider, and a live <InlineCode>page / total · start–end of N</InlineCode> readout.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic</DocSubtitle>
		<DocText>Bind <InlineCode>page</InlineCode> and pass <InlineCode>total</InlineCode> + <InlineCode>pageSize</InlineCode>. The component computes total pages and item range automatically.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes: normal, <InlineCode>compact</InlineCode>, <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
</div>
