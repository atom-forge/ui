<script lang="ts">
	import {Icon} from '../../general/icon';
	import DateTimePopover from './DateTimePopover.svelte';
	import type {XOR} from '../../../helpers/types';
	import {CalendarClock, X} from 'lucide-svelte';
	import {untrack} from 'svelte';
	import {twMerge} from 'tailwind-merge';

	type RoundProp = false | 0 | 5 | 10 | 15 | 20 | 30 | number[];

	let {
		value = $bindable(null),
		format = (d: Date) => d.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}),
		placeholder = 'Select date and time',
		disabled = false,
		clearable = false,
		min,
		max,
		seconds = false,
		round = false,
		compact,
		small,
		class: classes = '',
	}: XOR<{}, { compact: true }, { small: true }> & {
		value?: Date | null;
		format?: (date: Date) => string;
		placeholder?: string;
		disabled?: boolean;
		clearable?: boolean;
		min?: Date;
		max?: Date;
		seconds?: boolean;
		round?: RoundProp;
		class?: string;
	} = $props();

	const size = untrack(() => small ? 'small' : compact ? 'compact' : 'normal');

	function pad(n: number) { return String(n).padStart(2, '0'); }

	function dateToNativeValue(d: Date): string {
		const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
		const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
		return seconds ? `${date}T${time}:${pad(d.getSeconds())}` : `${date}T${time}`;
	}

	function handleNativeInput(e: Event) {
		const v = (e.target as HTMLInputElement).value;
		if (!v) { value = null; return; }
		const [date, time] = v.split('T');
		const [y, m, d] = date.split('-').map(Number);
		const [h, minValue, s] = time.split(':').map(Number);
		value = new Date(y, m - 1, d, h ?? 0, minValue ?? 0, s ?? 0, 0);
	}

	function clearValue(event: MouseEvent) {
		event.stopPropagation();
		value = null;
	}

	function shouldUseNativePicker() {
		return window.matchMedia('(pointer: coarse)').matches;
	}

	function containerClass(isOpen: boolean) {
		return twMerge(
		'relative w-full rounded-control bg-control border border-frame transition-colors cursor-pointer select-none',
		size === 'normal' && 'h-10 text-sm',
		size === 'compact' && 'h-8 text-xs',
		size === 'small' && 'h-6 text-xs',
		isOpen && 'ring-2 ring-accent',
		disabled && 'opacity-70 cursor-not-allowed',
		classes,
		);
	}

	const iconPad = size === 'normal' ? 'px-3' : 'px-2';
</script>

<DateTimePopover
	{value}
	{min}
	{max}
	{round}
	{seconds}
	{disabled}
	onconfirm={(next) => { value = next; }}
>
	{#snippet trigger(open, openState)}
		<div class={containerClass(openState)} role="button" tabindex={disabled ? undefined : 0} onclick={(e) => { if (!shouldUseNativePicker()) open(e); }} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(e); } }} aria-expanded={openState}>
			<input
				type="datetime-local"
				step={seconds ? 1 : 60}
				value={value ? dateToNativeValue(value) : ''}
				min={min ? dateToNativeValue(min) : undefined}
				max={max ? dateToNativeValue(max) : undefined}
				{disabled}
				class="absolute inset-0 w-full h-full opacity-0 pointer-events-none [@media(pointer:coarse)]:pointer-events-auto cursor-pointer z-10"
				oninput={handleNativeInput}
			/>

			<div class="flex h-full flex-row items-center pointer-events-none">
				<span class={twMerge('flex items-center text-muted-contrast shrink-0', iconPad)}>
					<Icon icon={CalendarClock} size="4"/>
				</span>
				<span class={twMerge('flex-1 truncate text-canvas-contrast select-none', size === 'normal' ? 'pr-3' : 'pr-2')}>
					{#if value}
						{format(value)}
					{:else}
						<span class="text-muted-contrast">{placeholder}</span>
					{/if}
				</span>
			</div>

			{#if clearable && value && !disabled}
				<button
					type="button"
					onclick={clearValue}
					class={twMerge(
						'absolute right-0 top-0 h-full flex items-center justify-center shrink-0 rounded text-muted-contrast hover:text-canvas-contrast transition-colors z-20',
						iconPad,
					)}
					tabindex="-1"
				>
					<Icon icon={X} size="3.5"/>
				</button>
			{/if}
		</div>
	{/snippet}
</DateTimePopover>
