<script lang="ts">
	import { Button, Input, getDrawerManager, Checkbox } from '$lib';
	import { X, Trash2, Save } from 'lucide-svelte';
	import type { CalendarEvent, CalendarEventColor } from '../../pro/calendar/types';

	let {
		event,
		onSave,
		onDelete,
	}: {
		event: CalendarEvent;
		onSave?: (updated: CalendarEvent) => void;
		onDelete?: (id: string) => void;
	} = $props();

	const drawer = getDrawerManager();

	let title     = $state(event.title);
	let subtitle  = $state(event.subtitle ?? '');
	let startDate = $state(event.startDate);
	let endDate   = $state(event.endDate);
	let color     = $state<CalendarEventColor>(event.color ?? 'blue');
	let readOnly  = $state(event.readOnly ?? false);

	const COLORS: CalendarEventColor[] = ['blue', 'green', 'red', 'orange', 'purple', 'teal', 'yellow'];

	// Color swatch classes (verbatim for Tailwind v4 scanning)
	const SWATCH: Record<CalendarEventColor, string> = {
		blue:   'bg-blue-500',
		green:  'bg-green-500',
		red:    'bg-red-500',
		orange: 'bg-orange-500',
		purple: 'bg-purple-500',
		teal:   'bg-teal-500',
		yellow: 'bg-yellow-500',
	};

	function save() {
		// Clamp: startDate must be <= endDate
		const s = startDate <= endDate ? startDate : endDate;
		const e = startDate <= endDate ? endDate   : startDate;
		onSave?.({ ...event, title, subtitle: subtitle || undefined, startDate: s, endDate: e, color, readOnly });
		drawer.close();
	}

	function remove() {
		onDelete?.(event.id);
		drawer.close();
	}
</script>

<div class="flex flex-col h-full">
	<!-- Header -->
	<div class="flex items-center justify-between px-5 py-4 border-b border-frame">
		<h2 class="text-sm font-semibold text-canvas-contrast">Edit Event</h2>
		<button
			onclick={() => drawer.close()}
			class="p-1.5 rounded hover:bg-secondary text-muted-contrast hover:text-canvas-contrast transition-colors cursor-pointer"
			aria-label="Close"
		>
			<X size={16} />
		</button>
	</div>

	<!-- Body -->
	<div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
		<div class="space-y-1">
			<label class="text-xs font-medium text-muted-contrast">Title</label>
			<Input bind:value={title} placeholder="Event title" />
		</div>

		<div class="space-y-1">
			<label class="text-xs font-medium text-muted-contrast">Subtitle</label>
			<Input bind:value={subtitle} placeholder="Optional subtitle" />
		</div>

		<div class="grid grid-cols-2 gap-3">
			<div class="space-y-1">
				<label class="text-xs font-medium text-muted-contrast">Start date</label>
				<input
					type="date"
					bind:value={startDate}
					class="w-full h-9 px-3 rounded-md bg-control border border-frame text-sm text-canvas-contrast focus:outline-none focus:ring-2 focus:ring-accent"
				/>
			</div>
			<div class="space-y-1">
				<label class="text-xs font-medium text-muted-contrast">End date</label>
				<input
					type="date"
					bind:value={endDate}
					min={startDate}
					class="w-full h-9 px-3 rounded-md bg-control border border-frame text-sm text-canvas-contrast focus:outline-none focus:ring-2 focus:ring-accent"
				/>
			</div>
		</div>

		<div class="flex items-center pt-2">
			<Checkbox bind:value={readOnly} label="Read-only" />
		</div>

		<div class="space-y-2">
			<label class="text-xs font-medium text-muted-contrast">Color</label>
			<div class="flex gap-2 flex-wrap">
				{#each COLORS as c}
					<button
						onclick={() => color = c}
						class="w-7 h-7 rounded-full transition-transform {SWATCH[c]} {color === c ? 'ring-2 ring-offset-2 ring-current scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}"
						aria-label={c}
					/>
				{/each}
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="px-5 py-4 border-t border-frame flex items-center justify-between gap-2">
		<Button onclick={remove} destructive ghost icon={Trash2} label="Delete" />
		<div class="flex gap-2">
			<Button onclick={() => drawer.close()} secondary label="Cancel" />
			<Button onclick={save} icon={Save} label="Save" />
		</div>
	</div>
</div>
