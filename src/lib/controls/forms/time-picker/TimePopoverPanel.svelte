<script lang="ts">
	import {onMount, untrack} from 'svelte';
	import {Card} from '../../display/card';
	import {Button} from '../../general/button';
	import {getPopupManager} from '../../overlays/popup';
	import TimePickerBody from './TimePickerBody.svelte';

	type RoundProp = false | 0 | 5 | 10 | 15 | 20 | 30 | number[];

	let {
		value = null,
		round = false,
		seconds = false,
		title,
		confirmLabel = 'OK',
		disabled = false,
		onconfirm,
		oncancel,
	}: {
		value?: string | null;
		round?: RoundProp;
		seconds?: boolean;
		title?: string;
		confirmLabel?: string;
		disabled?: boolean;
		onconfirm: (value: string) => void | Promise<void>;
		oncancel?: () => void;
	} = $props();

	const popupManager = getPopupManager();
	let selected = $state(untrack(() => value ?? (seconds ? '00:00:00' : '00:00')));
	let loading = $state(false);
	let panel: HTMLDivElement;

	function defaultTime() {
		return seconds ? '00:00:00' : '00:00';
	}

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

			<TimePickerBody value={selected} {round} {seconds} {disabled} onselect={(next) => selected = next ?? defaultTime()}/>
		</div>

		<div class="border-t border-frame">
			<Button accent grow label={confirmLabel} onclick={confirm} disabled={!selected || disabled} loading={loading} class="w-full rounded-none border-0"/>
		</div>
	</div>
</Card>
