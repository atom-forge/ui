<script lang="ts">
	import type {Snippet} from 'svelte';
	import {getPopupManager} from '../../overlays/popup';
	import TimePopoverPanel from './TimePopoverPanel.svelte';

	type RoundProp = false | 0 | 5 | 10 | 15 | 20 | 30 | number[];

	let {
		value = null,
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
		value?: string | null;
		round?: RoundProp;
		seconds?: boolean;
		title?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		disabled?: boolean;
		onconfirm: (value: string) => void | Promise<void>;
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
			TimePopoverPanel,
			{value, round, seconds, title, confirmLabel, cancelLabel, disabled, onconfirm, oncancel},
			{anchor: event?.currentTarget instanceof Element ? event.currentTarget : triggerWrap, align: 'left'},
		);
		isOpen = false;
		(event?.currentTarget instanceof HTMLElement ? event.currentTarget : triggerWrap)?.focus?.();
	}
</script>

<span class="contents" bind:this={triggerWrap}>
	{@render trigger(open, isOpen)}
</span>
