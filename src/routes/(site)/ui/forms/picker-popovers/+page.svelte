<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Shared', name: 'trigger', type: 'Snippet<[(event?: Event) => void, boolean]>', description: 'Required custom trigger. Receives open and isOpen. Pass the click event to open so the popup anchors to its currentTarget.' },
		{ group: 'Shared', name: 'title', type: 'string', description: 'Optional heading inside the popup panel.' },
		{ group: 'Shared', name: 'confirmLabel', type: 'string', default: "'OK'", description: 'Label of the confirmation button.' },
		{ group: 'Shared', name: 'cancelLabel', type: 'string', description: 'Accepted by the public wrapper types but not rendered by the panels in 0.0.34. There is no built-in cancel button.' },
		{ group: 'Shared', name: 'disabled', type: 'boolean', default: 'false', description: 'Prevent opening and disable panel editing. Disable your custom trigger separately if it should look inert.' },
		{ group: 'Shared', name: 'oncancel', type: '() => void', description: 'Called by the panel on Escape. Outside-click dismissal does not invoke this callback.' },
		{ group: 'DatePopover', name: 'value', type: 'Date | null', default: 'null', description: 'Initial calendar selection when opening; not bindable.' },
		{ group: 'DatePopover', name: 'onconfirm', type: '(value: Date) => void | Promise<void>', description: 'Required. Update your state or save the confirmed date.' },
		{ group: 'DatePopover', name: 'min / max / weekStart / disabledDates / disabledDays', type: 'same as DatePickerBody', description: 'Calendar-day restrictions and week layout.' },
		{ group: 'TimePopover', name: 'value', type: 'string | null', default: 'null', description: 'Initial HH:MM or HH:MM:SS time; null starts at midnight. Not bindable.' },
		{ group: 'TimePopover', name: 'onconfirm', type: '(value: string) => void | Promise<void>', description: 'Required. Receives the confirmed time.' },
		{ group: 'TimePopover', name: 'seconds / round', type: 'boolean / false | 0 | 5 | 10 | 15 | 20 | 30 | number[]', default: 'false', description: 'Enable seconds or restrict minute choices. Supply a nonempty array for explicit minute choices.' },
		{ group: 'DateTimePopover', name: 'value', type: 'Date | null', default: 'null', description: 'Initial local date/time; not bindable.' },
		{ group: 'DateTimePopover', name: 'onconfirm', type: '(value: Date) => void | Promise<void>', description: 'Required. Receives the composed local date/time.' },
		{ group: 'DateTimePopover', name: 'min / max / seconds / round', type: 'same as DateTimePickerBody', description: 'Calendar-day bounds and clock configuration; no weekStart or disabled-date props.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Picker Popovers</ProseTitle>
		<ProseText><DocInlineCode>DatePopover</DocInlineCode>, <DocInlineCode>TimePopover</DocInlineCode>, and <DocInlineCode>DateTimePopover</DocInlineCode> combine a custom trigger with a draft editor and an explicit confirmation button. They require a <DocInlineCode>Root</DocInlineCode> ancestor and its popup manager. Unlike the standard picker triggers, these always use the library popup, including on touch devices.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props}/></DocApiBlock>
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Custom date and time triggers</ProseTitle>
		<ProseText>The trigger snippet is required; a children snippet is not a substitute. Pass <DocInlineCode>value</DocInlineCode> one-way and update it in <DocInlineCode>onconfirm</DocInlineCode>. Edits are discarded when the popup is dismissed without confirmation.</ProseText>
		<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Async confirmation</ProseTitle>
		<ProseText>The panel awaits onconfirm before resolving the popup. Its confirmation button shows a loading state during that promise. Handle save errors in your callback and provide application feedback; returning normally closes the panel.</ProseText>
		<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
</ProsePage>
