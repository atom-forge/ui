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
		{ group: 'Content', name: 'avatars', type: '{ name?: string; src?: string; color?: string }[]', description: 'Array of avatar data. Each item maps to one Avatar — see Avatar props for details.' },
		{ group: 'Content', name: 'max', type: 'number', default: '5', description: 'Maximum number of visible avatars. A <code>+N</code> indicator is appended for the remainder.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — h-8 w-8 per avatar.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small size — h-6 w-6 per avatar.' },
		{ group: 'Size', name: 'micro', type: 'boolean', default: 'false', description: 'Micro size — h-5 w-5 per avatar.' },
		{ group: 'Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes on the wrapper.' },
	];
</script>

<DocTitle>Avatar Group</DocTitle>
<DocText>Renders a stack of overlapping Avatar components. When the list exceeds <InlineCode>max</InlineCode>, a <InlineCode>+N</InlineCode> overflow chip is shown.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Overflow & Sizes</DocSubtitle>
		<DocText>Avatars overlap with a ring separating them from the background. When <InlineCode>max</InlineCode> is exceeded, a <InlineCode>+N</InlineCode> indicator appears.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>With Images</DocSubtitle>
		<DocText>Mix <InlineCode>src</InlineCode> image avatars and initials avatars freely within the same group.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
</div>
