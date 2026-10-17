<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props', name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: '<code>vertical</code>: panels side by side. <code>horizontal</code>: panels stacked.' },
		{ group: 'Props', name: 'initialSize', type: 'number', default: '50', description: 'Initial size of the start panel as a percentage. Read only at initialization; later prop changes do not reset the panels.' },
		{ group: 'Props', name: 'minSize', type: 'number', default: '10', description: 'Minimum size either panel can reach (percent). Clamped during drag and keyboard resize.' },
		{ group: 'Props', name: 'class', type: 'string', description: 'Extra CSS classes applied to the divider element.' },
		{ group: 'Props', name: 'rootClass', type: 'string', description: 'Extra CSS classes applied to the root container element.' },
		{ group: 'Snippets', name: 'start', type: 'Snippet', description: 'Required. Content of the first panel (left for vertical, top for horizontal).' },
		{ group: 'Snippets', name: 'end', type: 'Snippet', description: 'Required. Content of the second panel (right for vertical, bottom for horizontal).' },
		{ group: 'Snippets', name: 'divider', type: 'Snippet', description: 'Optional custom divider handle. If omitted, a default thin line handle is shown.' },
		{ group: 'Events', name: 'onresize', type: '(detail: { start: number; end: number }) => void', description: 'Fires during dragging and on keyboard resizing.' },
		{ group: 'Events', name: 'onresizeend', type: '(detail: { start: number; end: number }) => void', description: 'Fires on drag release and after each keyboard resize.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Splitter</ProseTitle>
		<ProseText>
			A resizable split-panel container. The two panels are separated by a draggable divider.
			Supports vertical (side-by-side) and horizontal (stacked) orientations, touch events, and keyboard navigation.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Vertical (default)</ProseTitle>
				<ProseText>Panels sit side by side. Focus the divider and use <DocInlineCode>←</DocInlineCode> / <DocInlineCode>→</DocInlineCode> arrow keys to resize by 1% per press. Hold Shift for 10% steps.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Horizontal</ProseTitle>
				<ProseText>Set <DocInlineCode>orientation="horizontal"</DocInlineCode> to stack panels vertically. Arrow keys become <DocInlineCode>↑</DocInlineCode> / <DocInlineCode>↓</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom divider & resize callback</ProseTitle>
				<ProseText>Override the divider width/style via the <DocInlineCode>class</DocInlineCode> prop. Use <DocInlineCode>onresize</DocInlineCode> to track current panel sizes.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>
</ProsePage>
