<script lang="ts">
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import ShowExample from '../../../components/doc/ShowExample.svelte';
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
	import Example6 from './examples/Example6.svelte';
	import example6 from './examples/Example6.svelte?raw';
	import Example7 from './examples/Example7.svelte';
	import example7 from './examples/Example7.svelte?raw';
	import Example8 from './examples/Example8.svelte';
	import example8 from './examples/Example8.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Slider', name: 'value', type: 'number', default: '50', description: 'Bindable selected value.' },
		{ group: 'Slider', name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
		{ group: 'Slider', name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
		{ group: 'Slider', name: 'step', type: 'number', default: '1', description: 'Step increment.' },
		{ group: 'Slider', name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
		{ group: 'Slider', name: 'drawStops', type: 'boolean', default: 'false', description: 'Renders a dot on the track for each step position.' },
		{ group: 'Slider', name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Slider', name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },

		{ group: 'Range', name: 'value', type: '[number, number]', default: '[25, 75]', description: 'Bindable pair of values representing the selected range.' },
		{ group: 'Range', name: 'distance', type: '{ min?: number, max?: number }', default: '—', description: 'Enforced minimum and/or maximum gap between the two thumbs.' },
		{ group: 'Range', name: 'min / max / step / disabled / drawStops / compact / small', type: '—', default: '—', description: 'Same as <code>Slider</code>.' },
		{ group: 'Range', name: 'showValue', type: 'boolean | (value: number) => string', default: '—', description: 'Show current thumb value above the knob while dragging. Pass a function to format the label, e.g. <code>v => v + " °C"</code>. Also available on <code>Slider</code>.' },
	];
</script>

<DocTitle>Slider</DocTitle>
<DocText>
	Single-value and range inputs. Use <InlineCode>Slider</InlineCode> for a single thumb and <InlineCode>Range</InlineCode> for a two-thumb range selector.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Standard Slider</DocSubtitle>
		<DocText>Bind <InlineCode>value</InlineCode> to track the selected number.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Range Slider</DocSubtitle>
		<DocText>Use <InlineCode>Range</InlineCode> and bind a two-element array.</DocText>
		<ShowExample component={Example5} code={example5} />
	</div>
	<div>
		<DocSubtitle>Range with Distance Constraint</DocSubtitle>
		<DocText>The <InlineCode>distance</InlineCode> prop enforces a minimum and/or maximum gap between the two thumbs.</DocText>
		<ShowExample component={Example6} code={example6} />
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Step and Min / Max</DocSubtitle>
		<DocText>Customize the step increment and the value range.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
	<div>
		<DocSubtitle>Stops</DocSubtitle>
		<DocText>Set <InlineCode>drawStops</InlineCode> to render a dot on the track at each step position.</DocText>
		<ShowExample component={Example7} code={example7} />
	</div>
	<div>
		<DocSubtitle>Disabled</DocSubtitle>
		<DocText>The slider can be disabled.</DocText>
		<ShowExample component={Example4} code={example4} />
	</div>
	<div>
		<DocSubtitle>Show Value</DocSubtitle>
		<DocText>
			Set <InlineCode>showValue</InlineCode> to display the current value in a bubble above the knob while dragging.
			Pass a formatter function to add a unit or custom label.
		</DocText>
		<ShowExample component={Example8} code={example8} />
	</div>
</div>
