<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Tooltip</ProseTitle>
		<ProseText>Wraps any element and shows a floating label on hover after a short delay. The tooltip follows the cursor and is portalled to <DocInlineCode>#atom-forge-portal-target</DocInlineCode> to avoid clipping.</ProseText>

		<ProseText>Root supplies the portal target; if it is absent, Tooltip falls back to document.body. This implementation responds to mouse hover only, not keyboard focus, and does not add role=tooltip or aria-describedby automatically. Keep essential instructions visible and give icon-only triggers their own accessible names.</ProseText>
				<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Wrap any element with <DocInlineCode>Tooltip</DocInlineCode> and provide a <DocInlineCode>label</DocInlineCode>.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Inverted</ProseTitle>
				<ProseText>Add <DocInlineCode>inverted</DocInlineCode> for a dark background with light text — useful on light surfaces.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Rich Content</ProseTitle>
				<ProseText>Use the <DocInlineCode>content</DocInlineCode> snippet to render any markup inside the tooltip instead of plain text.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Delay</ProseTitle>
				<ProseText>Control how long the user must hover before the tooltip appears. Use <DocInlineCode>immediate</DocInlineCode> as shorthand for <DocInlineCode>delay={0}</DocInlineCode>.</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Fixed Position</ProseTitle>
				<ProseText>Add <DocInlineCode>fixed</DocInlineCode> to anchor the tooltip to the trigger element instead of following the cursor.</ProseText>
				<DocShowExample component={Example5} code={example5}/>
	</ProseParagraph>
</ProsePage>
