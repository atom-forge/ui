<script lang="ts">
	import Calendar from '../../pro/calendar/Calendar.svelte';
	import type { CalendarEvent, RestDayEntry } from '../../pro/calendar/types';
	import { Briefcase, Users, Flame, Star, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { Icon } from '$lib/gems/icon';
	import { getMonthName, todayStr, parseDate } from '../../pro/calendar/utils';
	import { createDrawerManager, DrawerContainer, getDrawerManager, Checkbox } from '$lib';
	import EventEditorDrawer from './EventEditorDrawer.svelte';

	createDrawerManager();
	const drawer = getDrawerManager();

	// Current month as default
	const todayDate = parseDate(todayStr());
	let year  = $state(todayDate.getFullYear());
	let month = $state(todayDate.getMonth()); // 0-based

	const monthName = $derived(getMonthName(year, month));

	function prevMonth() {
		if (month === 0) { month = 11; year--; } else month--;
	}
	function nextMonth() {
		if (month === 11) { month = 0; year++; } else month++;
	}
	function goToday() {
		year  = todayDate.getFullYear();
		month = todayDate.getMonth();
	}

	// Build demo events around the current month
	const now = new Date();
	const y   = now.getFullYear();
	const m   = String(now.getMonth() + 1).padStart(2, '0');
	const pad = (n: number) => String(n).padStart(2, '0');
	const d   = (day: number) => `${y}-${m}-${pad(day)}`;

	let events = $state<CalendarEvent[]>([
		{ id: '1', startDate: d(3),  endDate: d(5),  title: 'Sprint Planning', subtitle: 'Q2 kickoff', icon: Briefcase, color: 'blue'   },
		{ id: '2', startDate: d(7),  endDate: d(7),  title: 'Team Standup',    subtitle: 'All hands',  icon: Users,     color: 'green'  },
		{ id: '3', startDate: d(7),  endDate: d(7),  title: 'Design Review',                                             color: 'purple' },
		{ id: '4', startDate: d(10), endDate: d(14), title: 'Conference',      subtitle: 'TechConf',   icon: Flame,     color: 'orange' },
		{ id: '5', startDate: d(15), endDate: d(15), title: 'Public Holiday',                                             color: 'red',   readOnly: true },
		{ id: '6', startDate: d(18), endDate: d(21), title: 'Design Sprint',                                              color: 'teal'  },
		{ id: '7', startDate: d(22), endDate: d(22), title: 'Release Day',                              icon: Star,      color: 'yellow' },
	]);

	const extraRest: RestDayEntry[] = [
		{ date: `${y}-12-25`, name: 'Christmas'   },
		{ date: `${y}-12-26`, name: 'Boxing Day'  },
		{ date: `${y}-01-01`, name: "New Year's"  },
		{ date: `${y}-03-15`, name: 'National Day' },
		{ date: d(15),        name: 'Holiday'     },
	];

	let viewOnly     = $state(false);
	let allowCreate  = $state(true);
	let wrapMultiDay = $state(true);

	function onEventMove(id: string, newStart: string, newEnd: string) {
		events = events.map(e => e.id === id ? { ...e, startDate: newStart, endDate: newEnd } : e);
	}
	function onEventResize(id: string, newStart: string, newEnd: string) {
		events = events.map(e => e.id === id ? { ...e, startDate: newStart, endDate: newEnd } : e);
	}
	function onEventCreate(date: string) {
		const newEvent: CalendarEvent = {
			id: crypto.randomUUID(),
			startDate: date,
			endDate: date,
			title: 'New Event',
			color: 'blue',
		};
		events = [...events, newEvent];
		openEditor(newEvent);
	}
	function onEventClick(id: string) {
		const ev = events.find(e => e.id === id);
		if (ev) openEditor(ev);
	}

	function openEditor(ev: CalendarEvent) {
		drawer.open(EventEditorDrawer, {
			event: ev,
			onSave(updated: CalendarEvent) {
				events = events.map(e => e.id === updated.id ? updated : e);
			},
			onDelete(id: string) {
				events = events.filter(e => e.id !== id);
			},
		}, { size: 'sm' });
	}

	const navBtnClass = 'p-1.5 rounded hover:bg-secondary text-muted-contrast hover:text-canvas-contrast transition-colors cursor-pointer';
</script>

<DrawerContainer />

<div class="p-6 space-y-3 max-w-5xl mx-auto">
	<!-- Toolbar: navigation + options -->
	<div class="flex items-center justify-between flex-wrap gap-3">
		<div class="flex items-center gap-2">
			<button onclick={prevMonth} class={navBtnClass} aria-label="Previous month">
				<Icon icon={ChevronLeft} size="4" />
			</button>
			<button onclick={nextMonth} class={navBtnClass} aria-label="Next month">
				<Icon icon={ChevronRight} size="4" />
			</button>
			<span class="text-sm font-semibold text-canvas-contrast min-w-36">{monthName}</span>
			<button
				onclick={goToday}
				class="text-xs px-3 py-1.5 rounded border border-frame text-muted-contrast hover:text-canvas-contrast hover:bg-secondary transition-colors cursor-pointer"
			>Today</button>
		</div>

		<div class="flex items-center gap-5">
			<Checkbox bind:value={viewOnly} label="View only" />
			<Checkbox bind:value={allowCreate} label="Allow create" />
			<Checkbox bind:value={wrapMultiDay} label="Wrap multi-week" />
		</div>
	</div>

	<!-- Calendar: receives year/month from parent -->
	<Calendar
		bind:year
		bind:month
		{events}
		{viewOnly}
		{allowCreate}
		{wrapMultiDay}
		{onEventMove}
		{onEventResize}
		{onEventCreate}
		{onEventClick}
		{extraRest}
	/>

	<details class="text-xs">
		<summary class="text-muted-contrast cursor-pointer select-none">events JSON</summary>
		<pre class="mt-2 p-3 bg-surface rounded border border-frame overflow-auto text-canvas-contrast">{JSON.stringify(events, null, 2)}</pre>
	</details>
</div>
