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

	const props: PropDef[] = [
		{ group: 'State', name: 'page', type: 'number', description: 'Current page (1-indexed).' },
		{ group: 'State', name: 'total', type: 'number', description: 'Total number of pages.' },
		{ group: 'State', name: 'onchange', type: '(page: number) => void', description: 'Callback fired when the user navigates to a new page.' },
		{ group: 'Options', name: 'siblings', type: 'number', default: '1', description: 'How many page buttons to show on each side of the current page. Increase to show more context.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — h-8 w-8 per button.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small size — h-6 w-6 per button.' },
		{ group: 'Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes on the <code>&lt;nav&gt;</code> wrapper.' },
	];
</script>

<DocTitle>Pagination</DocTitle>
<DocText>A page navigation control. Shows first/last pages, a configurable number of sibling pages around the current one, and <InlineCode>…</InlineCode> ellipsis for skipped ranges.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic</DocSubtitle>
		<DocText>Bind <InlineCode>page</InlineCode> and react to <InlineCode>onchange</InlineCode>. The component handles all range calculation internally.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Siblings</DocSubtitle>
		<DocText>Control how many pages appear beside the current one with <InlineCode>siblings</InlineCode>. Increase for more context, decrease for a tighter layout.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes: normal, <InlineCode>compact</InlineCode>, <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
</div>
