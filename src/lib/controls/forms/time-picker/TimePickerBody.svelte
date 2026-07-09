<script lang="ts">
	import {ChevronDown, ChevronUp} from 'lucide-svelte';
	import {untrack} from 'svelte';

	type RoundProp = false | 0 | 5 | 10 | 15 | 20 | 30 | number[];

	let {
		value = null,
		seconds = false,
		round = false,
		disabled = false,
		onselect,
	}: {
		value?: string | null;
		seconds?: boolean;
		round?: RoundProp;
		disabled?: boolean;
		onselect?: (value: string | null) => void;
	} = $props();

	function pad(n: number) { return String(n).padStart(2, '0'); }

	const initial = $derived.by(() => {
		if (!value) return {h: 0, m: 0, s: 0};
		const [h, m, s] = value.split(':').map(Number);
		return {h: h ?? 0, m: m ?? 0, s: s ?? 0};
	});

	let hour = $state(untrack(() => initial.h));
	let minute = $state(untrack(() => initial.m));
	let second = $state(untrack(() => initial.s));

	$effect(() => {
		hour = initial.h;
		minute = initial.m;
		second = initial.s;
	});

	const minuteOptions = $derived.by((): number[] | null => {
		if (round === false) return null;
		if (Array.isArray(round)) return [...round].filter(m => m >= 0 && m < 60).sort((a, b) => a - b);
		if (round === 0) return [0];
		const opts: number[] = [];
		for (let i = 0; i < 60; i += round) opts.push(i);
		return opts;
	});

	const selectedValue = $derived(seconds
		? `${pad(hour)}:${pad(minute)}:${pad(second)}`
		: `${pad(hour)}:${pad(minute)}`
	);

	function emit() {
		onselect?.(selectedValue);
	}

	function snapMinute(m: number): number {
		if (!minuteOptions) return Math.max(0, Math.min(59, m));
		return minuteOptions.reduce((prev, cur) =>
			Math.abs(cur - m) < Math.abs(prev - m) ? cur : prev
		);
	}

	function hourUp() {
		if (disabled) return;
		hour = (hour + 1) % 24;
		emit();
	}

	function hourDown() {
		if (disabled) return;
		hour = (hour - 1 + 24) % 24;
		emit();
	}

	function minuteUp() {
		if (disabled) return;
		if (!minuteOptions) {
			if (minute === 59) { minute = 0; hour = (hour + 1) % 24; }
			else minute++;
		} else {
			const idx = minuteOptions.indexOf(minute);
			if (idx < 0 || idx === minuteOptions.length - 1) { minute = minuteOptions[0]; hour = (hour + 1) % 24; }
			else minute = minuteOptions[idx + 1];
		}
		emit();
	}

	function minuteDown() {
		if (disabled) return;
		if (!minuteOptions) {
			if (minute === 0) { minute = 59; hour = (hour - 1 + 24) % 24; }
			else minute--;
		} else {
			const idx = minuteOptions.indexOf(minute);
			if (idx <= 0) { minute = minuteOptions[minuteOptions.length - 1]; hour = (hour - 1 + 24) % 24; }
			else minute = minuteOptions[idx - 1];
		}
		emit();
	}

	function secondUp() {
		if (disabled) return;
		second = (second + 1) % 60;
		emit();
	}

	function secondDown() {
		if (disabled) return;
		second = (second - 1 + 60) % 60;
		emit();
	}

	function setHour(n: number) {
		hour = Math.max(0, Math.min(23, n));
		emit();
	}

	function setMinute(n: number) {
		minute = snapMinute(n);
		emit();
	}

	function setSecond(n: number) {
		second = Math.max(0, Math.min(59, n));
		emit();
	}

	const inputClass = 'w-12 h-11 text-center text-lg font-semibold font-mono tabular-nums bg-secondary rounded-control focus:outline-none focus:ring-2 focus:ring-accent text-canvas-contrast cursor-default select-none disabled:opacity-60';
	const btnClass = 'flex items-center justify-center w-12 h-7 rounded text-muted-contrast hover:text-canvas-contrast hover:bg-muted/60 transition-colors disabled:pointer-events-none disabled:opacity-40';
</script>

<div class="select-none">
	<div class="flex items-start justify-center gap-1">
		{#snippet spinCol(label: string, val: number, onUp: () => void, onDown: () => void, setVal: (n: number) => void)}
			<div class="flex flex-col items-center gap-1">
				<button type="button" class={btnClass} onclick={onUp} tabindex="-1" aria-label={`Increase ${label}`} {disabled}>
					<ChevronUp size={16} />
				</button>
				<input
					type="text"
					inputmode="numeric"
					class={inputClass}
					value={pad(val)}
					aria-label={label}
					{disabled}
					onfocus={(e) => (e.currentTarget as HTMLInputElement).select()}
					onblur={(e) => {
						const n = parseInt((e.currentTarget as HTMLInputElement).value, 10);
						if (!isNaN(n)) setVal(n);
						(e.currentTarget as HTMLInputElement).value = pad(val);
					}}
					onkeydown={(e) => {
						if (e.key === 'ArrowUp') { e.preventDefault(); onUp(); }
						if (e.key === 'ArrowDown') { e.preventDefault(); onDown(); }
					}}
					onwheel={(e) => { e.preventDefault(); e.deltaY < 0 ? onUp() : onDown(); }}
				/>
				<button type="button" class={btnClass} onclick={onDown} tabindex="-1" aria-label={`Decrease ${label}`} {disabled}>
					<ChevronDown size={16} />
				</button>
			</div>
		{/snippet}

		{#snippet sep()}
			<span class="text-2xl font-bold text-muted-contrast mt-9 select-none">:</span>
		{/snippet}

		{@render spinCol('Hours', hour, hourUp, hourDown, setHour)}
		{@render sep()}
		{@render spinCol('Minutes', minute, minuteUp, minuteDown, setMinute)}
		{#if seconds}
			{@render sep()}
			{@render spinCol('Seconds', second, secondUp, secondDown, setSecond)}
		{/if}
	</div>
</div>
