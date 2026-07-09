<script lang="ts">
	import { Card } from '../../display/card';
	import { Button } from '../../general/button';
	import { getPopupManager } from '../../overlays/popup';
	import TimePickerBody from './TimePickerBody.svelte';
	import {untrack} from 'svelte';

	type RoundProp = false | 0 | 5 | 10 | 15 | 20 | 30 | number[];

	let {
		value,
		seconds = false,
		round = false,
	}: {
		value?: string | null;
		seconds?: boolean;
		round?: RoundProp;
	} = $props();

	const popupManager = getPopupManager();
	let selected = $state(untrack(() => value ?? (seconds ? '00:00:00' : '00:00')));

	// ── confirm / cancel ──────────────────────────────────────────────────────

	function confirm() {
		popupManager.resolve(selected);
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') popupManager.close();
		if (e.key === 'Enter') confirm();
	}}
/>

<Card class="p-4 select-none">
	<TimePickerBody value={selected} {seconds} {round} onselect={(next) => selected = next ?? (seconds ? '00:00:00' : '00:00')}/>

	<div class="mt-4 flex justify-end">
		<Button small accent onclick={confirm}>OK</Button>
	</div>
</Card>
