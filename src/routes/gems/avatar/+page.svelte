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
		{ group: 'Content', name: 'name', type: 'string', description: 'Full name used to generate initials and auto-color. Initials are extracted from first letters of each word (max 2).' },
		{ group: 'Content', name: 'src', type: 'string', description: 'Image URL. When provided, renders an <code>&lt;img&gt;</code> instead of initials.' },
		{ group: 'Content', name: 'color', type: 'string', description: 'Override the auto-generated background/text color. Accepts any Tailwind color class string.' },
		{ group: 'Behaviour', name: 'tooltip', type: 'boolean', default: 'false', description: 'Shows the full name in a tooltip on hover. Requires <code>name</code> to be set.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — h-8 w-8, text-xs.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small size — h-6 w-6, text-[10px].' },
		{ group: 'Size', name: 'micro', type: 'boolean', default: 'false', description: 'Micro size — h-5 w-5, text-[9px]. For dense UI.' },
		{ group: 'Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes, merged via twMerge.' },
	];
</script>

<DocTitle>Avatar</DocTitle>
<DocText>A circular user representation component. Renders an image when <InlineCode>src</InlineCode> is provided, otherwise falls back to initials with a deterministic color generated from the name.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Sizes & Initials</DocSubtitle>
		<DocText>Four sizes: normal, <InlineCode>compact</InlineCode>, <InlineCode>small</InlineCode>, <InlineCode>micro</InlineCode>. Color is generated deterministically from the name — the same name always produces the same color.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Image & Custom Color</DocSubtitle>
		<DocText>Use <InlineCode>src</InlineCode> for a photo avatar. Override the auto-color with a Tailwind class string via <InlineCode>color</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
	<div>
		<DocSubtitle>Tooltip</DocSubtitle>
		<DocText>Add <InlineCode>tooltip</InlineCode> to show the full name on hover. Works with both initials and image avatars. Requires <InlineCode>name</InlineCode> to be set.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
</div>
