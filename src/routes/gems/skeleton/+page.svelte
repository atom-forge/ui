<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable from '../../../components/doc/ApiTable.svelte';
	import type {PropDef} from '../../../components/doc/ApiTable.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Shape (pick one)',  name: 'rect',     type: 'boolean',                     default: '—',    description: 'Rectangle shape. Default when no other shape is given.' },
		{ group: 'Shape (pick one)',  name: 'circle',   type: 'boolean',                     default: '—',    description: 'Circle shape (<code>rounded-full</code>). Size set via <code>class</code>.' },
		{ group: 'Shape (pick one)',  name: 'length',   type: 'boolean | number | number[]', default: '—',    description: '<code>true</code> → one full-width line. <code>number</code> → one line at that % width. <code>number[]</code> → multiple lines.' },

		{ group: 'Props',             name: 'animated', type: 'boolean',                     default: 'true', description: 'Toggles the shimmer animation.' },
		{ group: 'Props',             name: 'icon',     type: 'IconDefinition',              default: '—',    description: 'Renders a centred, faded icon inside the skeleton (useful for image placeholders).' },
		{ group: 'Props',             name: 'class',    type: 'string',                      default: '—',    description: 'Width, height, margin and any other utility classes.' },
	];
</script>

<DocTitle>Skeleton</DocTitle>
<DocText>
	Placeholder shapes that mimic the structure of loading content.
	A CSS shimmer animation runs across each element to signal activity
	without resorting to a spinner. All skeleton elements are
	<InlineCode>aria-hidden</InlineCode> so screen readers skip them.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic shapes</DocSubtitle>
		<DocText>
			Use <InlineCode>circle</InlineCode>, <InlineCode>rect</InlineCode> or
			<InlineCode>length</InlineCode> to pick the shape. Size is always controlled
			via the <InlineCode>class</InlineCode> prop.
		</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Composition</DocSubtitle>
		<DocText>
			Combine skeletons to mirror the layout of real components.
			The <InlineCode>icon</InlineCode> prop renders a faded placeholder icon inside
			a <InlineCode>rect</InlineCode> — useful for image or media cards.
		</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Animation toggle</DocSubtitle>
		<DocText>
			Set <InlineCode>animated={false}</InlineCode> to disable the shimmer —
			useful when displaying a static "empty" state or in tests.
		</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
</div>

