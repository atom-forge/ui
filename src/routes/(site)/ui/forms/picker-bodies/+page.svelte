<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ group: 'DatePickerBody', name: 'value', type: 'Date | null', default: 'null', description: 'Controlled selected calendar day; not bindable.' },
		{ group: 'DatePickerBody', name: 'onselect', type: '(value: Date | null) => void', description: 'Update your state from this callback. Day clicks produce a local Date.' },
		{ group: 'DatePickerBody', name: 'min / max', type: 'Date', description: 'Inclusive calendar-day bounds; time-of-day is ignored.' },
		{ group: 'DatePickerBody', name: 'weekStart', type: '0 | 1', default: '1', description: '0 is Sunday; 1 is Monday.' },
		{ group: 'DatePickerBody', name: 'disabledDates', type: 'Date[]', description: 'Disable matching local calendar days.' },
		{ group: 'DatePickerBody', name: 'disabledDays', type: 'number[]', description: 'Disable weekdays by Date.getDay(): 0 is Sunday, 6 is Saturday.' },
		{ group: 'DatePickerBody', name: 'disabled', type: 'boolean', default: 'false', description: 'Disable day selection and month navigation.' },
		{ group: 'TimePickerBody', name: 'value', type: 'string | null', default: 'null', description: 'Controlled HH:MM or HH:MM:SS time; not bindable. An empty value displays midnight.' },
		{ group: 'TimePickerBody', name: 'onselect', type: '(value: string | null) => void', description: 'Receives changes from spinner controls or segment input.' },
		{ group: 'TimePickerBody', name: 'seconds', type: 'boolean', default: 'false', description: 'Enable the seconds segment and HH:MM:SS output.' },
		{ group: 'TimePickerBody', name: 'round', type: 'false | 0 | 5 | 10 | 15 | 20 | 30 | number[]', default: 'false', description: 'Restrict minute choices. 0 means minute 00, an interval creates choices in 0–59, and an array supplies choices. Use a nonempty array of minute values.' },
		{ group: 'TimePickerBody', name: 'disabled', type: 'boolean', default: 'false', description: 'Disable spinner controls and segment inputs.' },
		{ group: 'DateTimePickerBody', name: 'value / onselect', type: 'Date | null / (value: Date | null) => void', default: 'null', description: 'Controlled local date/time value and change callback. No bind:value API.' },
		{ group: 'DateTimePickerBody', name: 'min / max / disabled / seconds / round', type: 'same as above', description: 'Compose a bounded calendar with a time spinner. Does not expose weekStart, disabledDates, or disabledDays.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Picker Bodies</ProseTitle>
		<ProseText><DocInlineCode>DatePickerBody</DocInlineCode>, <DocInlineCode>TimePickerBody</DocInlineCode>, and <DocInlineCode>DateTimePickerBody</DocInlineCode> are publicly exported inline editors. They have no trigger, popup, confirmation button, class prop, or size props. Wrap them in your own layout and pass <DocInlineCode>value</DocInlineCode> with <DocInlineCode>onselect</DocInlineCode>.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props}/></DocApiBlock>
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Inline date and time</ProseTitle>
		<ProseText>Each edit calls onselect immediately; clearing is an application action. DatePickerBody chooses its visible month from its initial value. Recreate it with a keyed block if an external value change must also change the displayed month.</ProseText>
		<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Combined date and time</ProseTitle>
		<ProseText>DateTimePickerBody composes local calendar and clock fields into one Date. With no selected date it emits null; selecting a date starts with midnight. Min/max constrain calendar days, not the clock. Use <a href="/ui/forms/picker-popovers" class="text-accent hover:underline">Picker Popovers</a> when edits should be confirmed before being committed.</ProseText>
		<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
</ProsePage>
