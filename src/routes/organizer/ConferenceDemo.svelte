<script lang="ts">
	import Organizer from '../../pro/organizer/Organizer.svelte';
	import type { OrganizerItem } from '../../pro/organizer/types.js';
	import { twMerge } from 'tailwind-merge';

	const tracks    = ['Main Stage', 'Workshop A', 'Workshop B', 'Lounge'];
	const startHour = 9;
	const rowHeight = 48;
	const rows      = 20; // 09:00 – 19:00

	function timeLabel(row: number): string {
		const totalMinutes = startHour * 60 + row * 30;
		const h = Math.floor(totalMinutes / 60);
		const m = totalMinutes % 60;
		return m === 0 ? `${h}:00` : '';
	}

	function rowToTime(row: number): string {
		const totalMinutes = startHour * 60 + row * 30;
		const h = Math.floor(totalMinutes / 60);
		const m = totalMinutes % 60;
		return `${h}:${String(m).padStart(2, '0')}`;
	}

	type SessionType = 'keynote' | 'talk' | 'workshop' | 'panel' | 'break';
	type Session = OrganizerItem & { title: string; speaker: string; type: SessionType };

	const typeColors: Record<SessionType, string> = {
		keynote:  'bg-violet-600 border-violet-500 text-white',
		talk:     'bg-blue-600   border-blue-500   text-white',
		workshop: 'bg-emerald-600 border-emerald-500 text-white',
		panel:    'bg-amber-600  border-amber-500  text-white',
		break:    'bg-secondary border-frame text-muted-contrast',
	};

	const trackColors = ['text-violet-400', 'text-emerald-400', 'text-sky-400', 'text-amber-400'];

	let sessions = $state<Session[]>([
		{ id: 'c1',  x: 0, y: 0,  w: 1, h: 3, title: 'Opening Keynote',         speaker: 'Sarah Chen',     type: 'keynote'  },
		{ id: 'c2',  x: 0, y: 3,  w: 1, h: 1, title: 'Coffee Break',            speaker: '',               type: 'break'    },
		{ id: 'c3',  x: 0, y: 4,  w: 1, h: 3, title: 'The Future of Web',       speaker: 'Marcus Webb',    type: 'talk'     },
		{ id: 'c4',  x: 0, y: 7,  w: 1, h: 1, title: 'Lunch',                   speaker: '',               type: 'break'    },
		{ id: 'c5',  x: 0, y: 8,  w: 1, h: 3, title: 'AI-Driven UX Patterns',   speaker: 'Lena Kovář',     type: 'keynote'  },
		{ id: 'c6',  x: 0, y: 11, w: 1, h: 2, title: 'Panel: Open Source',      speaker: 'Roundtable',     type: 'panel'    },
		{ id: 'c7',  x: 0, y: 13, w: 1, h: 1, title: 'Coffee Break',            speaker: '',               type: 'break'    },
		{ id: 'c8',  x: 0, y: 14, w: 1, h: 4, title: 'Closing Keynote',         speaker: 'James Okafor',   type: 'keynote'  },
		{ id: 'c9',  x: 0, y: 18, w: 1, h: 2, title: 'Networking Reception',    speaker: '',               type: 'break'    },
		{ id: 'c10', x: 1, y: 4,  w: 1, h: 4, title: 'Svelte 5 Deep Dive',     speaker: 'Anya Müller',    type: 'workshop' },
		{ id: 'c11', x: 1, y: 8,  w: 1, h: 4, title: 'TypeScript Mastery',     speaker: 'Tom Bradley',    type: 'workshop' },
		{ id: 'c12', x: 1, y: 14, w: 1, h: 4, title: 'CSS Architecture',        speaker: 'Priya Sharma',   type: 'workshop' },
		{ id: 'c13', x: 2, y: 4,  w: 1, h: 3, title: 'GraphQL in Practice',    speaker: 'Riku Tanaka',    type: 'workshop' },
		{ id: 'c14', x: 2, y: 7,  w: 1, h: 1, title: 'Lunch',                  speaker: '',               type: 'break'    },
		{ id: 'c15', x: 2, y: 8,  w: 1, h: 5, title: 'Building Design Systems',speaker: 'Claire Dubois',  type: 'workshop' },
		{ id: 'c16', x: 2, y: 14, w: 1, h: 3, title: 'Performance Deep Dive',  speaker: 'Alex Storm',     type: 'talk'     },
		{ id: 'c17', x: 3, y: 4,  w: 1, h: 2, title: 'Sponsor Talk: Vercel',   speaker: 'Vercel Team',    type: 'talk'     },
		{ id: 'c18', x: 3, y: 6,  w: 1, h: 2, title: 'Sponsor Talk: CF',       speaker: 'CF Team',        type: 'talk'     },
		{ id: 'c19', x: 3, y: 9,  w: 1, h: 3, title: 'Lightning Talks',        speaker: 'Various',        type: 'panel'    },
		{ id: 'c20', x: 3, y: 13, w: 1, h: 1, title: 'Mentor Office Hours',    speaker: 'Open',           type: 'break'    },
		{ id: 'c21', x: 3, y: 14, w: 1, h: 5, title: 'Hackathon Kickoff',      speaker: 'Community',      type: 'workshop' },
	]);
</script>

<div class="space-y-4">
	<div class="flex items-start justify-between flex-wrap gap-3">
		<div>
			<h2 class="text-base font-semibold text-canvas-contrast">JSConf 2026 — Program</h2>
			<p class="text-xs text-muted-contrast mt-0.5">Drag sessions to reschedule across tracks and time slots</p>
		</div>

		<div class="flex items-center gap-3 flex-wrap text-xs">
			{#each Object.entries(typeColors) as [type, cls]}
				<div class="flex items-center gap-1.5">
					<div class={twMerge('w-2.5 h-2.5 rounded-sm border', cls)}></div>
					<span class="text-muted-contrast capitalize">{type}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="bg-surface border-frame rounded-xl overflow-hidden">
		<Organizer
			bind:items={sessions}
			cols={4}
			{rows}
			{rowHeight}
			allowOverlap={false}
			overlapStrategy="calendar"
			resizable="vertical"
		>
			{#snippet colHeader(c)}
				<div class={twMerge(
					'text-center text-sm font-bold py-3 border-b border-r border-frame bg-surface last:border-r-0',
					trackColors[c],
				)}>
					{tracks[c]}
				</div>
			{/snippet}

			{#snippet rowHeader(r)}
				<div class="w-14 flex items-start justify-end pr-2 text-[11px] text-muted-contrast border-r border-frame" style="height:{rowHeight}px; padding-top:3px">
					{timeLabel(r)}
				</div>
			{/snippet}

			{#snippet cell({ y })}
				<div class={y % 2 === 0 ? 'h-full w-full border-b border-frame' : 'h-full w-full border-b border-frame/20'}></div>
			{/snippet}

			{#snippet item(ev)}
				{@const type = ev.type as SessionType}
				{@const title = ev.title as string}
				{@const speaker = ev.speaker as string}
				{@const colorCls = typeColors[type]}
				{@const isBreak = type === 'break'}
				<div
					class={twMerge(
						'h-full w-full rounded-lg border overflow-hidden flex flex-col px-2 py-1.5 text-xs shadow-sm',
						colorCls,
					)}
					style="margin:2px; width:calc(100% - 4px); height:calc(100% - 4px)"
				>
					<span class={twMerge('font-semibold leading-tight truncate', isBreak && 'text-center')}>{title}</span>
					{#if speaker && !isBreak}
						<span class="opacity-80 truncate mt-0.5">{speaker}</span>
					{/if}
					{#if ev.h >= 3 && !isBreak}
						<span class="opacity-60 mt-auto">{rowToTime(ev.y)} – {rowToTime(ev.y + ev.h)}</span>
					{/if}
				</div>
			{/snippet}
		</Organizer>
	</div>
</div>
