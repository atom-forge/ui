<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Avatar Group</ProseTitle>
		<ProseText>Renders a stack of overlapping Avatar components. When the list exceeds <DocInlineCode>max</DocInlineCode>, a <DocInlineCode>+N</DocInlineCode> overflow chip is shown.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Overflow & Sizes</ProseTitle>
				<ProseText>Avatars overlap with a ring separating them from the background. When <DocInlineCode>max</DocInlineCode> is exceeded, a <DocInlineCode>+N</DocInlineCode> indicator appears.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Images</ProseTitle>
				<ProseText>Mix <DocInlineCode>src</DocInlineCode> image avatars and initials avatars freely within the same group.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
</ProsePage>
