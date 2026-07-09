<script lang="ts">
	import type {Snippet} from 'svelte';
	import {getPopupManager} from '../../overlays/popup';
	import DateTimePopoverPanel from './DateTimePopoverPanel.svelte';

	type RoundProp = false | 0 | 5 | 10 | 15 | 20 | 30 | number[];

	let {
		value = null,
		min,
		max,
		round = false,
		seconds = false,
		title,
		confirmLabel,
		cancelLabel,
		disabled = false,
		onconfirm,
		oncancel,
		trigger,
	}: {
		value?: Date | null;
		min?: Date;
		max?: Date;
		round?: RoundProp;
		seconds?: boolean;
		title?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		disabled?: boolean;
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
			DateTimePopoverPanel,
			{value, min, max, round, seconds, title, confirmLabel, cancelLabel, disabled, onconfirm, oncancel},
			{anchor: event?.currentTarget instanceof Element ? event.currentTarget : triggerWrap, align: 'left'},
		);
		isOpen = false;
		(event?.currentTarget instanceof HTMLElement ? event.currentTarget : triggerWrap)?.focus?.();
	}
</script>

<span class="contents" bind:this={triggerWrap}>
	{@render trigger(open, isOpen)}
</span>
