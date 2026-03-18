<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable from '../../../components/doc/ApiTable.svelte';
	import type {PropDef} from '../../../components/doc/ApiTable.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3Raw from './examples/Example3.svelte?raw';

	import Example4 from './examples/Example4.svelte';
	import example4Raw from './examples/Example4.svelte?raw';

	const props: PropDef[] = [
		{ name: 'value', type: 'string | null', default: 'null', description: 'Bindable time value as <code>"HH:MM"</code> or <code>"HH:MM:SS"</code> when <code>seconds</code> is set.' },
		{ name: 'seconds', type: 'boolean', default: 'false', description: 'Show and include a seconds segment.' },
		{ name: 'placeholder', type: 'string', default: "'Select time'", description: 'Text shown when no time is selected.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
		{ name: 'clearable', type: 'boolean', default: 'false', description: 'Shows an × button to clear the selected time.' },
		{ name: 'round', type: 'false | 0 | 5 | 10 | 15 | 20 | 30 | number[]', default: 'false', description: 'Round to the nearest interval. <code>0</code> = nearest hour, number = nearest N minutes, array = snap to nearest value in list (e.g. <code>[0, 15, 30, 45]</code>).' },
		{ name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.' },
		{ name: 'small', type: 'boolean', default: 'false', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.' },
		{ name: 'class', type: 'string', default: '—', description: 'Additional CSS classes for the trigger element.' },
	];
</script>

<DocTitle>TimePicker</DocTitle>
<DocText>
	A time selector with a popup spinner. Each segment (hours, minutes, optionally seconds) can be
	adjusted via the chevron buttons, arrow keys, or direct input. Styled consistently with
	<InlineCode>DatePicker</InlineCode> and <InlineCode>Select</InlineCode>.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>
			Bind <InlineCode>value</InlineCode> to a <InlineCode>string | null</InlineCode>.
			The value format is <InlineCode>"HH:MM"</InlineCode>. Use <InlineCode>clearable</InlineCode> to allow clearing the selection.
		</DocText>
		<ShowExample component={Example1} code={example1Raw}/>
	</div>
	<div>
		<DocSubtitle>With Seconds</DocSubtitle>
		<DocText>
			Add <InlineCode>seconds</InlineCode> to show a third segment. The value format becomes <InlineCode>"HH:MM:SS"</InlineCode>.
		</DocText>
		<ShowExample component={Example2} code={example2Raw}/>
	</div>
	<div>
		<DocSubtitle>Sizes & Disabled</DocSubtitle>
		<DocText>
			Three sizes: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.
			Use <InlineCode>disabled</InlineCode> to prevent interaction.
		</DocText>
		<ShowExample component={Example3} code={example3Raw}/>
	</div>
	<div>
		<DocSubtitle>Rounding</DocSubtitle>
		<DocText>
			Use <InlineCode>round</InlineCode> to snap the value to the nearest interval.
			<InlineCode>0</InlineCode> rounds to the nearest hour, a number rounds to the nearest N minutes,
			and an array snaps to the nearest value in the list — e.g. <InlineCode>round={"{[0, 15, 30, 45]}"}</InlineCode>.
		</DocText>
		<ShowExample component={Example4} code={example4Raw}/>
	</div>
</div>

