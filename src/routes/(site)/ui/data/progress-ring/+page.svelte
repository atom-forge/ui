<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

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
		{ name: 'label', type: 'string', description: 'Text shown in the center. Defaults to the rounded percentage. Ignored when <code>children</code> is provided or rings is supplied.' },
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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Progress Ring</ProseTitle>
		<ProseText>A circular SVG progress indicator that animates as the value changes. Supports a single ring or multiple concentric rings via the <DocInlineCode>rings</DocInlineCode> prop.</ProseText>
		<ProseText>Use a positive max and enough size for every ring’s radius to remain positive. Non-positive maxima render an empty arc. A multi-ring control has no default center label; provide children for a summary. The root has role=progressbar and single-ring numeric ARIA values, but 0.0.34 does not forward arbitrary attributes such as aria-label. Include an adjacent textual description rather than assuming extra props reach the DOM.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Pass a <DocInlineCode>value</DocInlineCode> — the percentage is derived automatically from <DocInlineCode>value / max</DocInlineCode>.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes & Colors</ProseTitle>
				<ProseText>Control the outer diameter with <DocInlineCode>size</DocInlineCode> and arc thickness with <DocInlineCode>strokeWidth</DocInlineCode>. Pass any CSS color to <DocInlineCode>color</DocInlineCode> and <DocInlineCode>trackColor</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom Center Content</ProseTitle>
				<ProseText>Use the <DocInlineCode>children</DocInlineCode> snippet to render arbitrary content in the center. The snippet takes no parameters — reference your local state directly.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Multi Ring</ProseTitle>
				<ProseText>Pass a <DocInlineCode>rings</DocInlineCode> array to render multiple concentric rings, each with its own <DocInlineCode>value</DocInlineCode>, optional <DocInlineCode>max</DocInlineCode>, and <DocInlineCode>color</DocInlineCode>. Control spacing with <DocInlineCode>gap</DocInlineCode>.</ProseText>
				<DocShowExample component={Example5} code={example5} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Clock Demo</ProseTitle>
				<ProseText>A live clock with progress rings for hours, minutes, and seconds.</ProseText>
				<DocShowExample component={Example4} code={example4} />
	</ProseParagraph>
</ProsePage>
