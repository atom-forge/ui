import { getContext, setContext } from 'svelte';
import type { RMResource, RMProject, RMAllocation, LanedAllocation, ResourceRow, DragState } from './rm.types';
import { parseDate, formatDate, addDays, daysBetween } from '../gantt/gantt-utils';

const KEY = Symbol('resource-manager');

export const LANE_H = 28;   // px per lane
export const ROW_PAD = 12;  // vertical padding per row (top+bottom)
export const HEADER_H = 56; // timeline header height
export const LIST_W = 240;  // left panel width

export const ZOOM_LEVELS = [14, 20, 30, 44, 64];

function assignLanes(allocations: RMAllocation[]): LanedAllocation[] {
	const sorted = [...allocations].sort((a, b) => a.startDate.localeCompare(b.startDate));
	const laneEnds: string[] = [];
	const result: LanedAllocation[] = [];
	for (const alloc of sorted) {
		let assigned = -1;
		for (let i = 0; i < laneEnds.length; i++) {
			if (laneEnds[i] < alloc.startDate) {
				assigned = i;
				laneEnds[i] = alloc.endDate;
				break;
			}
		}
		if (assigned === -1) {
			assigned = laneEnds.length;
			laneEnds.push(alloc.endDate);
		}
		result.push({ alloc, lane: assigned });
	}
	return result;
}

export function rowHeight(laneCount: number): number {
	return Math.max(1, laneCount) * LANE_H + ROW_PAD;
}

function genId(): string {
	return `alloc-${Math.random().toString(36).slice(2, 9)}`;
}

export class RMContext {
	resources: RMResource[] = $state([]);
	projects: RMProject[] = $state([]);
	allocations: RMAllocation[] = $state([]);
	viewOnly: boolean = $state(false);
	workdays: string = $state('12345');
	extraRest: string[] = $state([]);
	extraWork: string[] = $state([]);
	dayWidth: number = $state(30);
	activeProjectId: string | null = $state(null);
	drag: DragState = $state(null);

	// Range: start/end of visible timeline
	rangeStart: Date = $state(new Date());
	rangeEnd: Date = $state(addDays(new Date(), 30));

	get totalDays() {
		return daysBetween(this.rangeStart, this.rangeEnd) + 1;
	}

	get totalWidth() {
		return this.totalDays * this.dayWidth;
	}

	dateToX(dateStr: string): number {
		return daysBetween(this.rangeStart, parseDate(dateStr)) * this.dayWidth;
	}

	xToDate(x: number): string {
		const days = Math.round(x / this.dayWidth);
		return formatDate(addDays(this.rangeStart, Math.max(0, days)));
	}

	todayX(): number {
		return daysBetween(this.rangeStart, new Date()) * this.dayWidth;
	}

	projectById(id: string): RMProject | undefined {
		return this.projects.find(p => p.id === id);
	}

	// Compute resource rows with lane assignments and cumulative y positions
	get rows(): ResourceRow[] {
		const result: ResourceRow[] = [];
		let offsetY = 0;
		for (const resource of this.resources) {
			const resourceAllocs = this.allocations.filter(a => a.resourceId === resource.id);
			const laned = assignLanes(resourceAllocs);
			const maxLane = laned.reduce((m, l) => Math.max(m, l.lane), -1);
			const laneCount = maxLane + 1;
			const rh = rowHeight(laneCount);
			result.push({ resource, laned, laneCount, rowHeight: rh, offsetY });
			offsetY += rh;
		}
		return result;
	}

	get totalHeight() {
		return this.rows.reduce((s, r) => s + r.rowHeight, 0);
	}

	addAllocation(resourceId: string, startDate: string, endDate: string) {
		if (!this.activeProjectId) return;
		this.allocations = [
			...this.allocations,
			{
				id: genId(),
				resourceId,
				projectId: this.activeProjectId,
				startDate,
				endDate,
			},
		];
	}

	deleteAllocation(id: string) {
		this.allocations = this.allocations.filter(a => a.id !== id);
	}

	updateAllocation(id: string, patch: Partial<RMAllocation>) {
		this.allocations = this.allocations.map(a => a.id === id ? { ...a, ...patch } : a);
	}

	shiftRange(days: number) {
		this.rangeStart = addDays(this.rangeStart, days);
		this.rangeEnd = addDays(this.rangeEnd, days);
	}

	goToToday() {
		const span = daysBetween(this.rangeStart, this.rangeEnd);
		const today = new Date();
		this.rangeStart = addDays(today, -7);
		this.rangeEnd = addDays(today, span - 7);
	}

	setSpan(days: number) {
		const today = new Date();
		this.rangeStart = addDays(today, -7);
		this.rangeEnd = addDays(today, days - 7);
	}

	zoomIn() {
		const idx = ZOOM_LEVELS.indexOf(this.dayWidth);
		if (idx < ZOOM_LEVELS.length - 1) this.dayWidth = ZOOM_LEVELS[idx + 1];
	}

	zoomOut() {
		const idx = ZOOM_LEVELS.indexOf(this.dayWidth);
		if (idx > 0) this.dayWidth = ZOOM_LEVELS[idx - 1];
	}
}

export function createRMContext(): RMContext {
	const ctx = new RMContext();
	setContext(KEY, ctx);
	return ctx;
}

export function getRMContext(): RMContext {
	return getContext<RMContext>(KEY);
}
