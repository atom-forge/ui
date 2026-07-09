<script lang="ts">
	import {onMount, untrack} from 'svelte';
	import {Card} from '../../display/card';
	import {Button} from '../../general/button';
	import {getPopupManager} from '../../overlays/popup';
	import DatePickerBody from './DatePickerBody.svelte';

	let {
		value = null,
		min,
		max,
		title,
		confirmLabel = 'OK',
		disabled = false,
		weekStart = 1,
		disabledDates,
		disabledDays,
		onconfirm,
		oncancel,
	}: {
		value?: Date | null;
		min?: Date;
		max?: Date;
		title?: string;
		confirmLabel?: string;
		disabled?: boolean;
		weekStart?: 0 | 1;
		disabledDates?: Date[];
		disabledDays?: number[];
		onconfirm: (value: Date) => void | Promise<void>;
		oncancel?: () => void;
	} = $props();

	const popupManager = getPopupManager();
	let selected = $state(untrack(() => value));
	let loading = $state(false);
	let panel: HTMLDivElement;

	onMount(() => {
		panel?.focus();
	});

	function cancel() {
		oncancel?.();
		popupManager.resolve();
	}

	async function confirm() {
		if (!selected || loading) return;
		loading = true;
		try {
			await onconfirm(selected);
			popupManager.resolve(selected);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') cancel(); }}/>

<Card class="w-fit shadow-lg">
	<div role="dialog" aria-modal="false" tabindex="-1" bind:this={panel}>
		<div class="p-2">
			{#if title}
				<div class="mb-3 text-sm font-semibold text-canvas-contrast">{title}</div>
			{/if}

			<DatePickerBody value={selected} {min} {max} {disabled} {weekStart} {disabledDates} {disabledDays} onselect={(next) => selected = next}/>
		</div>

		<div class="border-t border-frame">
			<Button accent grow label={confirmLabel} onclick={confirm} disabled={!selected || disabled} loading={loading} class="w-full rounded-none border-0"/>
		</div>
	</div>
</Card>
