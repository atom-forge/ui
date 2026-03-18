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

	const props: PropDef[] = [
		{group: 'DatePicker', name: 'value', type: 'Date | null', default: 'null', description: 'Bindable selected date.'},
		{group: 'DatePicker', name: 'format', type: '(date: Date) => string', default: 'en-US short', description: 'Custom date formatter. Defaults to <code>toLocaleDateString(\'en-US\', {...})</code>.'},
		{group: 'DatePicker', name: 'placeholder', type: 'string', default: "'Select date'", description: 'Text shown when no date is selected.'},
		{group: 'DatePicker', name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.'},
		{group: 'DatePicker', name: 'clearable', type: 'boolean', default: 'false', description: 'Shows an × button to clear the selected date.'},
		{group: 'DatePicker', name: 'min', type: 'Date', default: '—', description: 'Earliest selectable date (inclusive).'},
		{group: 'DatePicker', name: 'max', type: 'Date', default: '—', description: 'Latest selectable date (inclusive).'},
		{group: 'DatePicker', name: 'weekStart', type: '0 | 1', default: '1', description: 'First day of the week. <code>0</code> = Sunday, <code>1</code> = Monday.'},
		{group: 'DatePicker', name: 'disabledDates', type: 'Date[]', default: '—', description: 'Specific dates to disable.'},
		{group: 'DatePicker', name: 'disabledDays', type: 'number[]', default: '—', description: 'Days of the week to disable. <code>[0, 6]</code> disables weekends.'},
		{group: 'DatePicker', name: 'compact', type: 'boolean', default: '—', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.'},
		{group: 'DatePicker', name: 'small', type: 'boolean', default: '—', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.'},
		{group: 'DatePicker', name: 'class', type: 'string', default: '—', description: 'Additional CSS classes for the trigger element.'},
	];
</script>

<DocTitle>DatePicker</DocTitle>
<DocText>
	A single-date selector with a popup calendar. Styled consistently with
	<InlineCode>Select</InlineCode> and <InlineCode>Input</InlineCode>. Supports
	min/max bounds, disabled dates, and custom formatting.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Bind <InlineCode>value</InlineCode> to a <InlineCode>Date | null</InlineCode>. Use <InlineCode>clearable</InlineCode> to allow clearing the selection.</DocText>
		<ShowExample component={Example1} code={example1Raw}/>
	</div>

	<div>
		<DocSubtitle>Disabled Dates</DocSubtitle>
		<DocText>
			Use <InlineCode>min</InlineCode> to prevent past dates, and <InlineCode>disabledDays</InlineCode> to block specific weekdays
			(e.g. <InlineCode>[0, 6]</InlineCode> for weekends).
		</DocText>
		<ShowExample component={Example2} code={example2Raw}/>
	</div>

	<div>
		<DocSubtitle>Sizes & Custom Format</DocSubtitle>
		<DocText>
			Three sizes: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.
			Pass a custom <InlineCode>format</InlineCode> function to control how the selected date is displayed.
		</DocText>
		<ShowExample component={Example3} code={example3Raw}/>
	</div>
</div>
