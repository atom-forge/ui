<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

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

<ProsePage>
	<ProseParagraph>
		<ProseTitle>DatePicker</ProseTitle>
		<ProseText>
			A single-date selector with a popup calendar. Styled consistently with
			<DocInlineCode>Select</DocInlineCode> and <DocInlineCode>Input</DocInlineCode>. Supports
			min/max bounds, disabled dates, and custom formatting. Desktop selection is confirmed with OK; coarse-pointer devices use the native date input and update immediately. Place the picker under Root for its popup manager.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Bind <DocInlineCode>value</DocInlineCode> to a <DocInlineCode>Date | null</DocInlineCode>. Use <DocInlineCode>clearable</DocInlineCode> to allow clearing the selection.</ProseText>
				<DocShowExample component={Example1} code={example1Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled Dates</ProseTitle>
				<ProseText>
					Use <DocInlineCode>min</DocInlineCode> to prevent past dates, and <DocInlineCode>disabledDays</DocInlineCode> to block specific weekdays
					(e.g. <DocInlineCode>[0, 6]</DocInlineCode> for weekends). These weekday and individual-date restrictions apply to the library calendar, not the native input. Validate them in your application if they are business rules.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes & Custom Format</ProseTitle>
				<ProseText>
					Three sizes: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.
					Pass a custom <DocInlineCode>format</DocInlineCode> function to control how the selected date is displayed.
				</ProseText>
				<DocShowExample component={Example3} code={example3Raw}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Inline and custom-trigger APIs</ProseTitle>
		<ProseText>Use <a href="/ui/forms/picker-bodies" class="text-accent hover:underline">DatePickerBody</a> for immediate inline editing or <a href="/ui/forms/picker-popovers" class="text-accent hover:underline">DatePopover</a> for a custom trigger and onconfirm callback. Their value props are not bindable.</ProseText>
	</ProseParagraph>
</ProsePage>
