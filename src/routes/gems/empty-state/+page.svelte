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
		{ name: 'icon', type: 'IconDefinition', description: 'Icon shown above the title. Use <code>defineIcon()</code>.' },
		{ name: 'title', type: 'string', description: 'Primary empty-state message.' },
		{ name: 'description', type: 'string', description: 'Optional supporting text below the title.' },
		{ name: 'children', type: 'Snippet', description: 'Optional CTA area — e.g. a Button to trigger an action.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the root element.' },
	];
</script>

<DocTitle>Empty State</DocTitle>
<DocText>A centered placeholder shown when a list or section has no content. Combines an icon, title, optional description, and an optional call-to-action.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic</DocSubtitle>
		<DocText>Pass an <InlineCode>icon</InlineCode> and <InlineCode>title</InlineCode> as the minimum. Add <InlineCode>description</InlineCode> for context.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>With Call-to-Action</DocSubtitle>
		<DocText>Use the <InlineCode>children</InlineCode> slot to render a button or link below the description.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
</div>
