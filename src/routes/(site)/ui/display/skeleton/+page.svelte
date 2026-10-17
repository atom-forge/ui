<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Shape (pick one)',  name: 'rect',     type: 'boolean',                     default: '—',    description: 'Rectangle shape. The public types require one of rect, circle, or length; pass rect explicitly.' },
		{ group: 'Shape (pick one)',  name: 'circle',   type: 'boolean',                     default: '—',    description: 'Circle shape (<code>rounded-full</code>). Size set via <code>class</code>.' },
		{ group: 'Shape (pick one)',  name: 'length',   type: 'boolean | number | number[]', default: '—',    description: '<code>true</code> → one full-width line. <code>number</code> → one line at that % width. <code>number[]</code> → multiple lines.' },

		{ group: 'Props',             name: 'animated', type: 'boolean',                     default: 'true', description: 'Toggles the shimmer animation.' },
		{ group: 'Props',             name: 'icon',     type: 'IconDefinition',              default: '—',    description: 'Renders a centred, faded icon inside the skeleton (useful for image placeholders).' },
		{ group: 'Props',             name: 'class',    type: 'string',                      default: '—',    description: 'Width, height, margin and any other utility classes.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Skeleton</ProseTitle>
		<ProseText>
			Placeholder shapes that mimic the structure of loading content.
			A CSS shimmer animation runs across each element to signal activity
			without resorting to a spinner. All skeleton elements are
			<DocInlineCode>aria-hidden</DocInlineCode> so screen readers skip them.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic shapes</ProseTitle>
				<ProseText>
					Use <DocInlineCode>circle</DocInlineCode>, <DocInlineCode>rect</DocInlineCode> or
					<DocInlineCode>length</DocInlineCode> to pick the shape. Size is always controlled
					via the <DocInlineCode>class</DocInlineCode> prop.
				</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Composition</ProseTitle>
				<ProseText>
					Combine skeletons to mirror the layout of real components.
					The <DocInlineCode>icon</DocInlineCode> prop renders a faded placeholder icon inside
					a <DocInlineCode>rect</DocInlineCode> — useful for image or media cards.
				</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Animation toggle</ProseTitle>
				<ProseText>
					Set <DocInlineCode>animated={'{false}'}</DocInlineCode> to disable the shimmer —
					useful when displaying a static "empty" state or in tests.
				</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>
</ProsePage>
