<script lang="ts">
	import {
		Button,
		ContextMenu,
		DatePicker,
		getPopupManager,
		MultiSelect,
		Select,
		TagEditor,
		TimePicker,
		type ContextMenuItemConfig
	} from '../../../lib/index.js';

	let {prefix}: {prefix: string} = $props();

	const popup = getPopupManager();
	const options = [
		{value: 'design', label: 'Design'},
		{value: 'engineering', label: 'Engineering'},
		{value: 'ops', label: 'Operations'},
		{value: 'support', label: 'Support'}
	];
	const menu: ContextMenuItemConfig[] = [
		{label: 'Rename', resolveWith: 'rename'},
		{label: 'Copy', resolveWith: 'copy'},
		{separator: true},
		{label: 'Delete', warning: true, resolveWith: 'delete'}
	];

	let selected = $state<string | number>('design');
	let selectedMany = $state<(string | number)[]>(['engineering']);
	let date = $state<Date | null>(new Date());
	let time = $state<string | null>('09:30');
	let tags = $state<string[]>(['overlay']);
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
	<Select bind:value={selected} {options} placeholder={`${prefix} select`}/>
	<MultiSelect bind:value={selectedMany} {options} placeholder={`${prefix} multi-select`}/>
	<DatePicker bind:value={date}/>
	<TimePicker bind:value={time}/>
	<TagEditor bind:value={tags} options={['overlay', 'modal', 'drawer', 'popup']} placeholder={`${prefix} tags`}/>
	<Button
		secondary
		label="Context menu"
		onclick={(event) => popup.open.component(ContextMenu, {config: menu}, {anchor: event, align: 'left'})}
	/>
</div>
