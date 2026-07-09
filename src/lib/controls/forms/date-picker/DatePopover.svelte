<script lang="ts">
	import type {Snippet} from 'svelte';
	import {getPopupManager} from '../../overlays/popup';
	import DatePopoverPanel from './DatePopoverPanel.svelte';

	let {
		value = null,
		min,
		max,
		title,
		confirmLabel,
		cancelLabel,
		disabled = false,
		weekStart = 1,
		disabledDates,
		disabledDays,
		onconfirm,
		oncancel,
		trigger,
	}: {
		value?: Date | null;
		min?: Date;
		max?: Date;
		title?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		disabled?: boolean;
		weekStart?: 0 | 1;
		disabledDates?: Date[];
		disabledDays?: number[];
		onconfirm: (value: Date) => void | Promise<void>;
		oncancel?: () => void;
		trigger: Snippet<[(event?: Event) => void, boolean]>;
	} = $props();

	const popupManager = getPopupManager();
	let isOpen = $state(false);
	let triggerWrap: HTMLSpanElement;

	async function open(event?: Event) {
		if (disabled || isOpen) return;
		isOpen = true;
		await popupManager.open.component(
			DatePopoverPanel,
			{value, min, max, title, confirmLabel, cancelLabel, disabled, weekStart, disabledDates, disabledDays, onconfirm, oncancel},
			{anchor: event?.currentTarget instanceof Element ? event.currentTarget : triggerWrap, align: 'left'},
		);
		isOpen = false;
		(event?.currentTarget instanceof HTMLElement ? event.currentTarget : triggerWrap)?.focus?.();
	}
</script>

<span class="contents" bind:this={triggerWrap}>
	{@render trigger(open, isOpen)}
</span>
