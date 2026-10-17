<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Content', name: 'name', type: 'string', description: 'Full name used to generate initials and auto-color. Initials are extracted from first letters of each word (max 2).' },
		{ group: 'Content', name: 'src', type: 'string', description: 'Image URL. When provided, renders an <code>&lt;img&gt;</code> instead of initials.' },
		{ group: 'Content', name: 'color', type: 'string', description: 'Override the auto-generated background/text color. Accepts a Tailwind class string; prefer a semantic background/contrast pair for custom palettes.' },
		{ group: 'Behaviour', name: 'tooltip', type: 'boolean', default: 'false', description: 'Shows the full name in a tooltip on hover. Requires <code>name</code> to be set.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — h-8 w-8, text-xs.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small size — h-6 w-6, text-[10px].' },
		{ group: 'Size', name: 'micro', type: 'boolean', default: 'false', description: 'Micro size — h-5 w-5, text-[9px]. For dense UI.' },
		{ group: 'Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes, merged via twMerge.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Avatar</ProseTitle>
		<ProseText>A circular user representation component. Renders an image when <DocInlineCode>src</DocInlineCode> is provided, otherwise falls back to initials with a deterministic color generated from the name.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes & Initials</ProseTitle>
				<ProseText>Four sizes: normal, <DocInlineCode>compact</DocInlineCode>, <DocInlineCode>small</DocInlineCode>, <DocInlineCode>micro</DocInlineCode>. Color is generated deterministically from the name — the same name always produces the same color.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Image & Custom Color</ProseTitle>
				<ProseText>Use <DocInlineCode>src</DocInlineCode> for a photo avatar. Override the built-in fixed palette via <DocInlineCode>color</DocInlineCode>. Use a semantic background/contrast pair so your custom avatar follows theme overrides.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Tooltip</ProseTitle>
				<ProseText>Add <DocInlineCode>tooltip</DocInlineCode> to show the full name on hover. Works with both initials and image avatars. Requires <DocInlineCode>name</DocInlineCode> to be set.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>
</ProsePage>
