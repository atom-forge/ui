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
	import Example6 from './examples/Example6.svelte';
	import example6 from './examples/Example6.svelte?raw';
	import Example7 from './examples/Example7.svelte';
	import example7 from './examples/Example7.svelte?raw';
	import Example8 from './examples/Example8.svelte';
	import example8 from './examples/Example8.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Slider', name: 'value', type: 'number', default: '50', description: 'Bindable selected value. Clamped to min/max at initialization; out-of-range initial values also log an error.' },
		{ group: 'Slider', name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
		{ group: 'Slider', name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
		{ group: 'Slider', name: 'step', type: 'number', default: '1', description: 'Step increment.' },
		{ group: 'Slider', name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
		{ group: 'Slider', name: 'class', type: 'string', description: 'Extra classes forwarded to the slider wrapper. Also available on Range.' },
				{ group: 'Slider', name: 'drawStops', type: 'boolean', default: 'false', description: 'Renders a dot on the track for each step position.' },
		{ group: 'Slider', name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Slider', name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },

		{ group: 'Range', name: 'value', type: '[number, number]', default: '[25, 75]', description: 'Bindable pair of values representing the selected range.' },
		{ group: 'Range', name: 'distance', type: '{ min?: number, max?: number }', default: '—', description: 'Enforced minimum and/or maximum gap between the two thumbs.' },
		{ group: 'Range', name: 'min / max / step / disabled / drawStops / compact / small', type: '—', default: '—', description: 'Same as <code>Slider</code>.' },
		{ group: 'Range', name: 'showValue', type: 'boolean | (value: number) => string', default: '—', description: 'Show current thumb value above the knob while dragging. Pass a function to format the label, e.g. <code>v => v + " °C"</code>. Also available on <code>Slider</code>.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Slider</ProseTitle>
		<ProseText>
			Single-value and range inputs. Use <DocInlineCode>Slider</DocInlineCode> for a single thumb and <DocInlineCode>Range</DocInlineCode> for a two-thumb range selector.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Standard Slider</ProseTitle>
				<ProseText>Bind <DocInlineCode>value</DocInlineCode> to track the selected number.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Range Slider</ProseTitle>
				<ProseText>Use <DocInlineCode>Range</DocInlineCode> and bind a two-element array.</ProseText>
				<DocShowExample component={Example5} code={example5} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Range with Distance Constraint</ProseTitle>
				<ProseText>The <DocInlineCode>distance</DocInlineCode> prop enforces a minimum and/or maximum gap between the two thumbs.</ProseText>
				<DocShowExample component={Example6} code={example6} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Step and Min / Max</ProseTitle>
				<ProseText>Customize the step increment and the value range.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Stops</ProseTitle>
				<ProseText>Set <DocInlineCode>drawStops</DocInlineCode> to render a dot on the track at each step position.</ProseText>
				<DocShowExample component={Example7} code={example7} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled</ProseTitle>
				<ProseText>The slider can be disabled.</ProseText>
				<DocShowExample component={Example4} code={example4} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Show Value</ProseTitle>
				<ProseText>
					Set <DocInlineCode>showValue</DocInlineCode> to display the current value in a bubble above the knob while dragging.
					Pass a formatter function to add a unit or custom label.
				</ProseText>
				<DocShowExample component={Example8} code={example8} />
	</ProseParagraph>
</ProsePage>
