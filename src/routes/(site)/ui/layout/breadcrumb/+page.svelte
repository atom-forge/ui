<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
		import Example3 from './examples/Example3.svelte';
		import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ name: 'items', type: '{ label: string; href?: string; onclick?: (event: MouseEvent) => void }[]', description: 'Ordered list of breadcrumb segments. The last item is always rendered as non-clickable bold text regardless of <code>href</code>.' },
		{ name: 'maxLabelLength', type: 'number', description: 'Maximum character length for each segment label. Longer labels are truncated with <code>…</code>.' },
		{ name: 'maxSegments', type: 'number', description: 'Maximum number of visible segments. When exceeded, the first and last items are shown and the middle ones collapse into a <code>…</code> button that opens a popup.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the <code>&lt;nav&gt;</code> element.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Breadcrumb</ProseTitle>
		<ProseText>A navigation trail showing the current page's location within a hierarchy. Items are separated by <DocInlineCode>/</DocInlineCode> and the last item is always rendered as non-clickable text.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Navigation Trail</ProseTitle>
				<ProseText>Pass an array of <DocInlineCode>items</DocInlineCode> with optional <DocInlineCode>href</DocInlineCode>. The last item is always non-clickable regardless of whether an <DocInlineCode>href</DocInlineCode> is provided.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Truncation & Collapse</ProseTitle>
				<ProseText>Use <DocInlineCode>maxLabelLength</DocInlineCode> to truncate long labels with <DocInlineCode>…</DocInlineCode>. Use <DocInlineCode>maxSegments</DocInlineCode> to collapse the middle segments into a <DocInlineCode>…</DocInlineCode> button — clicking it opens a popup with the hidden items.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Callback navigation</ProseTitle>
		<ProseText>Use an item-level <DocInlineCode>onclick</DocInlineCode> for application actions. The last item remains non-interactive. Call <DocInlineCode>event.preventDefault()</DocInlineCode> when replacing link navigation.</ProseText>
		<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>
</ProsePage>
