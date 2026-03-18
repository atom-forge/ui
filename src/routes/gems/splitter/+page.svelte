<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable, { type PropDef } from '../../../components/doc/ApiTable.svelte';
	import InlineCode from '../../../components/doc/InlineCode.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props', name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: '<code>vertical</code>: panels side by side. <code>horizontal</code>: panels stacked.' },
		{ group: 'Props', name: 'initialSize', type: 'number', default: '50', description: 'Initial size of the start panel as a percentage.' },
		{ group: 'Props', name: 'minSize', type: 'number', default: '10', description: 'Minimum size either panel can reach (percent). Clamped during drag and keyboard resize.' },
		{ group: 'Props', name: 'class', type: 'string', description: 'Extra CSS classes applied to the divider element.' },
		{ group: 'Props', name: 'rootClass', type: 'string', description: 'Extra CSS classes applied to the root container element.' },
		{ group: 'Snippets', name: 'start', type: 'Snippet', description: 'Required. Content of the first panel (left for vertical, top for horizontal).' },
		{ group: 'Snippets', name: 'end', type: 'Snippet', description: 'Required. Content of the second panel (right for vertical, bottom for horizontal).' },
		{ group: 'Snippets', name: 'divider', type: 'Snippet', description: 'Optional custom divider handle. If omitted, a default thin line handle is shown.' },
		{ group: 'Events', name: 'onresize', type: '(detail: { start: number; end: number }) => void', description: 'Fires continuously while the user drags the divider.' },
		{ group: 'Events', name: 'onresizeend', type: '(detail: { start: number; end: number }) => void', description: 'Fires once when the user releases the divider.' },
	];
</script>

<DocTitle>Splitter</DocTitle>
<DocText>
	A resizable split-panel container. The two panels are separated by a draggable divider.
	Supports vertical (side-by-side) and horizontal (stacked) orientations, touch events, and keyboard navigation.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Vertical (default)</DocSubtitle>
		<DocText>Panels sit side by side. Focus the divider and use <InlineCode>←</InlineCode> / <InlineCode>→</InlineCode> arrow keys to resize with the keyboard.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Horizontal</DocSubtitle>
		<DocText>Set <InlineCode>orientation="horizontal"</InlineCode> to stack panels vertically. Arrow keys become <InlineCode>↑</InlineCode> / <InlineCode>↓</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Custom divider & resize callback</DocSubtitle>
		<DocText>Override the divider width/style via the <InlineCode>class</InlineCode> prop. Use <InlineCode>onresize</InlineCode> to track current panel sizes.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
</div>
