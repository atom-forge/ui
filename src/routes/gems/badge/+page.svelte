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
		{ name: 'children', type: 'Snippet', description: 'The element the badge is overlaid on.' },
		{ name: 'count', type: 'number', description: 'Number displayed in the badge. Badge is hidden when <code>count</code> is 0.' },
		{ name: 'dot', type: 'boolean', default: 'false', description: 'Show a dot indicator instead of a number.' },
		{ name: 'max', type: 'number', default: '99', description: 'Maximum number shown. Displays <code>N+</code> when exceeded.' },
		{ name: 'color', type: "'accent' | 'red' | 'green' | 'blue'", default: "'accent'", description: 'Badge color.' },
		{ name: 'hidden', type: 'boolean', default: 'false', description: 'Force-hides the badge regardless of count.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the wrapper.' },
	];
</script>

<DocTitle>Badge</DocTitle>
<DocText>An absolute-positioned overlay indicator — typically used to show notification counts or status dots on icons, buttons, or avatars.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Count & Colors</DocSubtitle>
		<DocText>Supports <InlineCode>accent</InlineCode>, <InlineCode>red</InlineCode>, <InlineCode>green</InlineCode>, and <InlineCode>blue</InlineCode> colors. The badge auto-hides when <InlineCode>count</InlineCode> is 0, and shows <InlineCode>N+</InlineCode> when it exceeds <InlineCode>max</InlineCode>.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Dot Variant</DocSubtitle>
		<DocText>Use <InlineCode>dot</InlineCode> for a minimal status indicator without a number.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
</div>
