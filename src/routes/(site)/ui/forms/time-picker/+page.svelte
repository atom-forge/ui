<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

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
		{ name: 'round', type: 'false | 0 | 5 | 10 | 15 | 20 | 30 | number[]', default: 'false', description: 'Desktop minute choices: <code>0</code> restricts minutes to 00; an interval or nonempty array defines allowed minutes. Native input rounds to the nearest hour/interval/list value. Desktop controls do not automatically round externally supplied values.' },
		{ name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.' },
		{ name: 'small', type: 'boolean', default: 'false', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.' },
		{ name: 'class', type: 'string', default: '—', description: 'Additional CSS classes for the trigger element.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>TimePicker</ProseTitle>
		<ProseText>
			A time selector with a popup spinner. Each segment (hours, minutes, optionally seconds) can be
			adjusted via the chevron buttons, arrow keys, or direct input. Styled consistently with
			<DocInlineCode>DatePicker</DocInlineCode> and <DocInlineCode>Select</DocInlineCode>. Desktop edits are confirmed with OK; coarse-pointer devices use a native time input. The popup requires a Root ancestor.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>
					Bind <DocInlineCode>value</DocInlineCode> to a <DocInlineCode>string | null</DocInlineCode>.
					The value format is <DocInlineCode>"HH:MM"</DocInlineCode>. Use <DocInlineCode>clearable</DocInlineCode> to allow clearing the selection.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Seconds</ProseTitle>
				<ProseText>
					Add <DocInlineCode>seconds</DocInlineCode> to show a third segment. The value format becomes <DocInlineCode>"HH:MM:SS"</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes & Disabled</ProseTitle>
				<ProseText>
					Three sizes: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.
					Use <DocInlineCode>disabled</DocInlineCode> to prevent interaction.
				</ProseText>
				<DocShowExample component={Example3} code={example3Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Rounding</ProseTitle>
				<ProseText>
					Use <DocInlineCode>round</DocInlineCode> to restrict desktop minute choices.
					<DocInlineCode>0</DocInlineCode> allows minute 00, an interval creates minute choices,
					and a nonempty array supplies specific minutes — e.g. <DocInlineCode>round={"{[0, 15, 30, 45]}"}</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example4} code={example4Raw}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Inline and custom-trigger APIs</ProseTitle>
		<ProseText>Use <a href="/ui/forms/picker-bodies" class="text-accent hover:underline">TimePickerBody</a> for inline editing or <a href="/ui/forms/picker-popovers" class="text-accent hover:underline">TimePopover</a> for custom triggers and confirmation callbacks. Their value props are not bindable.</ProseText>
	</ProseParagraph>
</ProsePage>
