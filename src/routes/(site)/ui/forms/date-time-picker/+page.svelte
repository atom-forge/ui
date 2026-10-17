<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ name: 'value', type: 'Date | null', default: 'null', description: 'Bindable local date and time. Clearing sets it to null.' },
		{ name: 'format', type: '(date: Date) => string', default: 'en-US date + hour/minute', description: 'Trigger formatter. The default does not show seconds, even when seconds is enabled.' },
		{ name: 'placeholder', type: 'string', default: "'Select date and time'", description: 'Trigger text when value is null.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the trigger and native input.' },
		{ name: 'clearable', type: 'boolean', default: 'false', description: 'Show a clear button when a value is present.' },
		{ name: 'min / max', type: 'Date', description: 'Inclusive calendar-day bounds in the desktop calendar; full date/time bounds on the native datetime-local input. Validate time-of-day bounds in application code as well.' },
		{ name: 'seconds', type: 'boolean', default: 'false', description: 'Enable the seconds segment and native one-second step.' },
		{ name: 'round', type: 'false | 0 | 5 | 10 | 15 | 20 | 30 | number[]', default: 'false', description: 'Desktop minute choices: false allows all minutes, 0 restricts minutes to 00, an interval or nonempty array supplies allowed minute values. The native datetime-local handler does not apply this rounding.' },
		{ name: 'compact / small', type: 'true (choose at most one)', description: 'Trigger height: normal h-10, compact h-8, small h-6.' },
		{ name: 'class', type: 'string', description: 'Extra classes on the trigger wrapper.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>DateTimePicker</ProseTitle>
		<ProseText>A combined calendar and time spinner with explicit confirmation. Unlike TimePicker, its value is a <DocInlineCode>Date | null</DocInlineCode>, not a time string. Place it under <DocInlineCode>Root</DocInlineCode> for the popup manager.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props}/></DocApiBlock>
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Basic usage</ProseTitle>
		<ProseText>Desktop edits remain in the popup until OK is pressed. Coarse-pointer devices use a native <DocInlineCode>datetime-local</DocInlineCode> input that updates immediately. The component composes local date parts; it does not select a time zone.</ProseText>
		<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Bounds, seconds, formatting, and sizes</ProseTitle>
		<ProseText>Use a custom formatter to display seconds. Desktop min/max checks operate on calendar days, not time-of-day, and desktop minute choices do not constrain native input. Validate those requirements before persisting the selected appointment.</ProseText>
		<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Compose your own picker</ProseTitle>
		<ProseText>Use <a href="/ui/forms/picker-bodies" class="text-accent hover:underline">DateTimePickerBody</a> for inline editing or <a href="/ui/forms/picker-popovers" class="text-accent hover:underline">DateTimePopover</a> for a custom trigger and confirmation callback.</ProseText>
	</ProseParagraph>
</ProsePage>
