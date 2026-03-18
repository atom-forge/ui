<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable, { type PropDef } from '../../../components/doc/ApiTable.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';
	import Example4 from './examples/Example4.svelte';
	import example4 from './examples/Example4.svelte?raw';
	import Example5 from './examples/Example5.svelte';
	import example5 from './examples/Example5.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Single ring', name: 'value', type: 'number', default: '0', description: 'Current progress value. Used in single-ring mode.' },
		{ name: 'max', type: 'number', default: '100', description: 'Maximum value. Percentage is derived as <code>value / max × 100</code>. Clamped to [0, max].' },
		{ name: 'color', type: 'string', default: "'var(--color-accent)'", description: 'Progress arc color. Any valid CSS color string. Used as fallback color in multi-ring mode.' },
		{ name: 'label', type: 'string', description: 'Text shown in the center. Defaults to the rounded percentage. Ignored when <code>children</code> is provided.' },
		{ name: 'labelClass', type: 'string', description: 'Extra classes on the default center label.' },
		{ group: 'Multi ring', name: 'rings', type: 'RingDef[]', description: 'Array of ring definitions for multi-ring mode. Each entry: <code>{ value, max?, color? }</code>. Rings are drawn concentrically from outermost to innermost.' },
		{ name: 'gap', type: 'number', default: '4', description: 'Gap in pixels between concentric rings in multi-ring mode.' },
		{ group: 'Layout', name: 'size', type: 'number', default: '120', description: 'Outer diameter in pixels.' },
		{ name: 'strokeWidth', type: 'number', default: '12', description: 'Width of both the track and progress arcs in pixels.' },
		{ name: 'trackColor', type: 'string', default: "'var(--color-secondary)'", description: 'Color of the background track arc(s).' },
		{ name: 'children', type: 'Snippet', description: 'Custom center content. Overrides the default percentage label. The snippet receives no parameters — use local state directly.' },
		{ name: 'class', type: 'string', description: 'Extra classes on the root element.' },
	];
</script>

<DocTitle>Progress Ring</DocTitle>
<DocText>A circular SVG progress indicator that animates as the value changes. Supports a single ring or multiple concentric rings via the <InlineCode>rings</InlineCode> prop.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Pass a <InlineCode>value</InlineCode> — the percentage is derived automatically from <InlineCode>value / max</InlineCode>.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Sizes & Colors</DocSubtitle>
		<DocText>Control the outer diameter with <InlineCode>size</InlineCode> and arc thickness with <InlineCode>strokeWidth</InlineCode>. Pass any CSS color to <InlineCode>color</InlineCode> and <InlineCode>trackColor</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Custom Center Content</DocSubtitle>
		<DocText>Use the <InlineCode>children</InlineCode> snippet to render arbitrary content in the center. The snippet takes no parameters — reference your local state directly.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
	<div>
		<DocSubtitle>Multi Ring</DocSubtitle>
		<DocText>Pass a <InlineCode>rings</InlineCode> array to render multiple concentric rings, each with its own <InlineCode>value</InlineCode>, optional <InlineCode>max</InlineCode>, and <InlineCode>color</InlineCode>. Control spacing with <InlineCode>gap</InlineCode>.</DocText>
		<ShowExample component={Example5} code={example5} />
	</div>
	<div>
		<DocSubtitle>Clock Demo</DocSubtitle>
		<DocText>A live clock with progress rings for hours, minutes, and seconds.</DocText>
		<ShowExample component={Example4} code={example4} />
	</div>
</div>
