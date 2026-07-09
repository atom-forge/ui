<script lang="ts">
	import {Card} from '../../display/card';
	import {getPopupManager} from '../../overlays/popup';
	import DatePickerBody from './DatePickerBody.svelte';

	let {
		value,
		min,
		max,
		weekStart = 1,
		disabledDates,
		disabledDays,
	}: {
		value?: Date | null;
		min?: Date;
		max?: Date;
		weekStart?: 0 | 1;
		disabledDates?: Date[];
		disabledDays?: number[];
	} = $props();

	const popupManager = getPopupManager();
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') popupManager.close(); }}/>

<Card class="p-3 w-72">
	<DatePickerBody {value} {min} {max} {weekStart} {disabledDates} {disabledDays} onselect={(selected) => popupManager.resolve(selected)}/>
</Card>
