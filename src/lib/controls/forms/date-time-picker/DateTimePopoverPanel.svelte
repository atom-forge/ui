<script lang="ts">
	import {onMount, untrack} from 'svelte';
	import {Card} from '../../display/card';
	import {Button} from '../../general/button';
	import {getPopupManager} from '../../overlays/popup';
	import DateTimePickerBody from './DateTimePickerBody.svelte';

	type RoundProp = false | 0 | 5 | 10 | 15 | 20 | 30 | number[];

	let {
		value = null,
		min,
		max,
		round = false,
		seconds = false,
		title,
		confirmLabel = 'OK',
		disabled = false,
		onconfirm,
		oncancel,
	}: {
		value?: Date | null;
		min?: Date;
		max?: Date;
		round?: RoundProp;
		seconds?: boolean;
		title?: string;
		confirmLabel?: string;
		disabled?: boolean;
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

			<DateTimePickerBody value={selected} {min} {max} {round} {seconds} {disabled} onselect={(next) => selected = next}/>
		</div>

		<div class="border-t border-frame">
			<Button accent grow label={confirmLabel} onclick={confirm} disabled={!selected || disabled} loading={loading} class="w-full rounded-none border-0"/>
		</div>
	</div>
</Card>
