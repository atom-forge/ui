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
		{ name: 'items', type: '{ label: string; href?: string }[]', description: 'Ordered list of breadcrumb segments. The last item is always rendered as non-clickable bold text regardless of <code>href</code>.' },
		{ name: 'maxLabelLength', type: 'number', description: 'Maximum character length for each segment label. Longer labels are truncated with <code>…</code>.' },
		{ name: 'maxSegments', type: 'number', description: 'Maximum number of visible segments. When exceeded, the first and last items are shown and the middle ones collapse into a <code>…</code> button that opens a popup.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the <code>&lt;nav&gt;</code> element.' },
	];
</script>

<DocTitle>Breadcrumb</DocTitle>
<DocText>A navigation trail showing the current page's location within a hierarchy. Items are separated by <InlineCode>/</InlineCode> and the last item is always rendered as non-clickable text.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Navigation Trail</DocSubtitle>
		<DocText>Pass an array of <InlineCode>items</InlineCode> with optional <InlineCode>href</InlineCode>. The last item is always non-clickable regardless of whether an <InlineCode>href</InlineCode> is provided.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Truncation & Collapse</DocSubtitle>
		<DocText>Use <InlineCode>maxLabelLength</InlineCode> to truncate long labels with <InlineCode>…</InlineCode>. Use <InlineCode>maxSegments</InlineCode> to collapse the middle segments into a <InlineCode>…</InlineCode> button — clicking it opens a popup with the hidden items.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
</div>
