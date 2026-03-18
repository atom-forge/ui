<script lang="ts">
	import Organizer from '../../pro/organizer/Organizer.svelte';
	import type { BlockedRegion, OrganizerItem, OrganizerItemRendered } from '../../pro/organizer/types.js';
	import { twMerge } from 'tailwind-merge';

	const employees   = ['Alice K.', 'Bob M.', 'Carol T.', 'Dave S.', 'Eve L.', 'Frank R.'];
	const startHour   = 6;  // 06:00
	const rowHeight   = 40;
	const rows        = 18; // 06:00 – 00:00

	function timeLabel(row: number): string {
		const totalMinutes = startHour * 60 + row * 60;
		const h = Math.floor(totalMinutes / 60);
		return `${h}:00`;
	}

	function rowToTime(row: number): string {
		const totalMinutes = startHour * 60 + row * 60;
		const h = Math.floor(totalMinutes / 60) % 24;
		return `${h}:00`;
	}

	type ShiftRole = 'morning' | 'afternoon' | 'evening' | 'break' | 'training';
	type Shift = OrganizerItem & { role: ShiftRole; label: string };

	const roleColors: Record<ShiftRole, string> = {
		morning:   'bg-amber-500/90   border-amber-400   text-white',
		afternoon: 'bg-sky-500/90     border-sky-400     text-white',
		evening:   'bg-indigo-500/90  border-indigo-400  text-white',
		break:     'bg-secondary        border-frame       text-muted-contrast',
		training:  'bg-emerald-500/90 border-emerald-400 text-white',
	};

	const roleIcons: Record<ShiftRole, string> = {
		morning:   '☀️',
		afternoon: '🌤',
		evening:   '🌙',
		break:     '☕',
		training:  '📚',
	};

	let shifts = $state<Shift[]>([
		{ id: 's1',  x: 0, y: 0,  w: 1, h: 6,  role: 'morning',   label: 'Morning shift'   },
		{ id: 's2',  x: 0, y: 6,  w: 1, h: 1,  role: 'break',     label: 'Lunch'           },
		{ id: 's3',  x: 1, y: 0,  w: 1, h: 2,  role: 'training',  label: 'Onboarding'      },
		{ id: 's4',  x: 1, y: 2,  w: 1, h: 6,  role: 'morning',   label: 'Morning shift'   },
		{ id: 's5',  x: 2, y: 4,  w: 1, h: 8,  role: 'afternoon', label: 'Afternoon shift' },
		{ id: 's6',  x: 2, y: 12, w: 1, h: 1,  role: 'break',     label: 'Break'           },
		{ id: 's7',  x: 3, y: 2,  w: 1, h: 4,  role: 'morning',   label: 'Half-day'        },
		{ id: 's8',  x: 3, y: 8,  w: 1, h: 6,  role: 'afternoon', label: 'Afternoon shift' },
		{ id: 's9',  x: 4, y: 8,  w: 1, h: 8,  role: 'evening',   label: 'Evening shift'   },
		{ id: 's10', x: 4, y: 0,  w: 1, h: 3,  role: 'training',  label: 'Safety training' },
		{ id: 's11', x: 5, y: 10, w: 1, h: 8,  role: 'evening',   label: 'Evening shift'   },
		{ id: 's12', x: 5, y: 3,  w: 1, h: 2,  role: 'break',     label: 'Meeting'         },
	]);

	const blocked: BlockedRegion[] = [{ x: 5, y: 0, w: 1, h: 3 }];

	let allowOverlap = $state(false);

	function duration(item: OrganizerItemRendered): string {
		return `${item.h}h`;
	}
</script>

<div class="space-y-4">
	<div class="flex items-start justify-between flex-wrap gap-3">
		<div>
			<h2 class="text-base font-semibold text-canvas-contrast">Shift Planner — Today</h2>
			<p class="text-xs text-muted-contrast mt-0.5">Drag to reassign shifts · Resize to adjust hours · Striped = unavailable</p>
		</div>

		<div class="flex items-center gap-3 flex-wrap">
			<div class="flex items-center gap-2 flex-wrap text-xs">
				{#each Object.entries(roleColors) as [role, cls]}
					<div class="flex items-center gap-1.5">
						<div class={twMerge('w-2.5 h-2.5 rounded-sm border', cls)}></div>
						<span class="text-muted-contrast">{roleIcons[role as ShiftRole]} {role}</span>
					</div>
				{/each}
			</div>

			<label class="flex items-center gap-2 text-sm text-canvas-contrast cursor-pointer select-none">
				<input type="checkbox" bind:checked={allowOverlap} class="rounded" />
				Allow overlap
			</label>
		</div>
	</div>

	<div class="bg-surface border-frame rounded-xl overflow-hidden">
		<Organizer
			bind:items={shifts}
			cols={6}
			{rows}
			{rowHeight}
			{allowOverlap}
			overlapStrategy="compress"
			resizable="vertical"
			{blocked}
		>
			{#snippet colHeader(c)}
				<div class="text-center text-sm font-semibold text-canvas-contrast py-3 border-b border-r border-frame bg-surface last:border-r-0">
					{employees[c]}
				</div>
			{/snippet}

			{#snippet rowHeader(r)}
				<div class="w-14 flex items-start justify-end pr-2 text-[11px] text-muted-contrast border-r border-frame" style="height:{rowHeight}px; padding-top:2px">
					{timeLabel(r)}
				</div>
			{/snippet}

			{#snippet cell({ y })}
				<div class={twMerge(
					'h-full w-full border-b',
					y % 2 === 0 ? 'border-frame' : 'border-frame/30',
				)}></div>
			{/snippet}

			{#snippet item(ev)}
				{@const role = ev.role as ShiftRole}
				{@const label = ev.label as string}
				{@const icon = roleIcons[role]}
				{@const colorCls = roleColors[role]}
				<div
					class={twMerge(
						'h-full w-full rounded-lg border overflow-hidden flex flex-col justify-between px-2 py-1.5 text-xs shadow-sm',
						colorCls,
					)}
					style="margin:2px; width:calc(100% - 4px); height:calc(100% - 4px)"
				>
					<div class="flex items-center gap-1 font-semibold leading-tight">
						<span>{icon}</span>
						<span class="truncate">{label}</span>
					</div>
					{#if ev.h >= 2}
						<div class="opacity-75">{rowToTime(ev.y)} – {rowToTime(ev.y + ev.h)} · {duration(ev)}</div>
					{/if}
				</div>
			{/snippet}
		</Organizer>
	</div>
</div>
