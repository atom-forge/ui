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

	const props: PropDef[] = [
		{ name: 'children', type: 'Snippet', description: 'The element(s) that trigger the tooltip on hover.' },
		{ name: 'label', type: 'string', description: 'Text shown inside the tooltip. Either <code>label</code> or <code>content</code> is required.' },
		{ name: 'content', type: 'Snippet', description: 'Custom snippet rendered inside the tooltip. Takes precedence over <code>label</code>.' },
		{ name: 'delay', type: 'number', default: '1000', description: 'Delay in milliseconds before the tooltip appears.' },
		{ name: 'immediate', type: 'boolean', default: 'false', description: 'Shorthand for <code>delay={0}</code> — tooltip appears instantly.' },
		{ name: 'inverted', type: 'boolean', default: 'false', description: 'Inverted style: dark background with light text.' },
		{ name: 'fixed', type: 'boolean', default: 'false', description: 'Anchors the tooltip to the trigger element instead of following the cursor.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the trigger wrapper.' },
	];
</script>

<DocTitle>Tooltip</DocTitle>
<DocText>Wraps any element and shows a floating label on hover after a short delay. The tooltip follows the cursor and is portalled to <InlineCode>#atom-forge-portal-target</InlineCode> to avoid clipping.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Wrap any element with <InlineCode>Tooltip</InlineCode> and provide a <InlineCode>label</InlineCode>.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Inverted</DocSubtitle>
		<DocText>Add <InlineCode>inverted</InlineCode> for a dark background with light text — useful on light surfaces.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
	<div>
		<DocSubtitle>Rich Content</DocSubtitle>
		<DocText>Use the <InlineCode>content</InlineCode> snippet to render any markup inside the tooltip instead of plain text.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
	<div>
		<DocSubtitle>Delay</DocSubtitle>
		<DocText>Control how long the user must hover before the tooltip appears. Use <InlineCode>immediate</InlineCode> as shorthand for <InlineCode>delay={0}</InlineCode>.</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>
	<div>
		<DocSubtitle>Fixed Position</DocSubtitle>
		<DocText>Add <InlineCode>fixed</InlineCode> to anchor the tooltip to the trigger element instead of following the cursor.</DocText>
		<ShowExample component={Example5} code={example5}/>
	</div>
</div>
