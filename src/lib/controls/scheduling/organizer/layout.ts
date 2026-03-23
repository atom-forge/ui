import type { OrganizerItem, OrganizerItemRendered, OverlapStrategy } from './types.js';

// ── helpers ───────────────────────────────────────────────────────────────────

function baseLayout(item: OrganizerItem, cols: number, lane = 0, laneCount = 1): OrganizerItemRendered {
	const colW = 100 / cols;
	const itemW = item.w * colW / laneCount;
	const left = item.x * colW + lane * itemW;
	return {
		...item,
		_lane: lane,
		_laneCount: laneCount,
		_renderLeft: `${left}%`,
		_renderWidth: `${itemW}%`,
	};
}

// ── overlap helpers ───────────────────────────────────────────────────────────

function overlapY(a: OrganizerItem, b: OrganizerItem): boolean {
	return a.y < b.y + b.h && a.y + a.h > b.y;
}

function overlapX(a: OrganizerItem, b: OrganizerItem): boolean {
	return a.x < b.x + b.w && a.x + a.w > b.x;
}

/**
 * Összefüggő komponensek keresése az átfedési gráfban (DFS).
 * Az overlapFn paraméterrel választható, hogy y- vagy x-átfedést vizsgálunk.
 */
function findConflictGroups(
	items: OrganizerItem[],
	overlapFn: (a: OrganizerItem, b: OrganizerItem) => boolean = overlapY,
): OrganizerItem[][] {
	const visited = new Set<string>();
	const groups: OrganizerItem[][] = [];

	function dfs(item: OrganizerItem, group: OrganizerItem[]) {
		visited.add(item.id);
		group.push(item);
		for (const other of items) {
			if (!visited.has(other.id) && overlapFn(item, other)) {
				dfs(other, group);
			}
		}
	}

	for (const item of items) {
		if (!visited.has(item.id)) {
			const group: OrganizerItem[] = [];
			dfs(item, group);
			groups.push(group);
		}
	}

	return groups;
}

// ── calendar layout ───────────────────────────────────────────────────────────

/**
 * Google Calendar-stílusú elrendezés.
 *  1. Csoportosítás `x` szerint
 *  2. Conflict group-ok keresése y-átfedéssel
 *  3. Greedy lane-kiosztás y-rendezés után
 */
function computeCalendarLayout(items: OrganizerItem[], cols: number): OrganizerItemRendered[] {
	const byX = new Map<number, OrganizerItem[]>();
	for (const item of items) {
		if (!byX.has(item.x)) byX.set(item.x, []);
		byX.get(item.x)!.push(item);
	}

	const laneMap = new Map<string, { lane: number; laneCount: number }>();

	for (const colItems of byX.values()) {
		const groups = findConflictGroups(colItems, overlapY);

		for (const group of groups) {
			const sorted = [...group].sort((a, b) => a.y - b.y || a.id.localeCompare(b.id));
			const laneEnds: number[] = [];

			for (const item of sorted) {
				let lane = laneEnds.findIndex(end => end <= item.y);
				if (lane === -1) lane = laneEnds.length;
				laneEnds[lane] = item.y + item.h;
				laneMap.set(item.id, { lane, laneCount: 0 });
			}

			const laneCount = laneEnds.length;
			for (const item of group) {
				laneMap.set(item.id, { ...laneMap.get(item.id)!, laneCount });
			}
		}
	}

	return items.map(item => {
		const { lane, laneCount } = laneMap.get(item.id) ?? { lane: 0, laneCount: 1 };
		return baseLayout(item, cols, lane, laneCount);
	});
}

// ── calendar-v layout ─────────────────────────────────────────────────────────

/**
 * Horizontal timeline (Gantt-stílusú) elrendezés — a calendar tükörképe.
 *  1. Csoportosítás `y` szerint
 *  2. Conflict group-ok keresése x-átfedéssel
 *  3. Greedy lane-kiosztás x-rendezés után
 *  4. Az item magasságát osztja laneCount részre (_renderTop + _renderHeight)
 */
function computeCalendarVLayout(items: OrganizerItem[], cols: number, rowHeight: number): OrganizerItemRendered[] {
	const byY = new Map<number, OrganizerItem[]>();
	for (const item of items) {
		if (!byY.has(item.y)) byY.set(item.y, []);
		byY.get(item.y)!.push(item);
	}

	const laneMap = new Map<string, { lane: number; laneCount: number }>();

	for (const rowItems of byY.values()) {
		const groups = findConflictGroups(rowItems, overlapX);

		for (const group of groups) {
			const sorted = [...group].sort((a, b) => a.x - b.x || a.id.localeCompare(b.id));
			const laneEnds: number[] = [];

			for (const item of sorted) {
				let lane = laneEnds.findIndex(end => end <= item.x);
				if (lane === -1) lane = laneEnds.length;
				laneEnds[lane] = item.x + item.w;
				laneMap.set(item.id, { lane, laneCount: 0 });
			}

			const laneCount = laneEnds.length;
			for (const item of group) {
				laneMap.set(item.id, { ...laneMap.get(item.id)!, laneCount });
			}
		}
	}

	return items.map(item => {
		const { lane, laneCount } = laneMap.get(item.id) ?? { lane: 0, laneCount: 1 };
		const base = baseLayout(item, cols, 0, 1); // left/width unchanged
		const itemH = (item.h * rowHeight) / laneCount;
		return {
			...base,
			_lane: lane,
			_laneCount: laneCount,
			_renderTop: `${item.y * rowHeight + lane * itemH}px`,
			_renderHeight: `${itemH}px`,
		};
	});
}

// ── public API ────────────────────────────────────────────────────────────────

export function computeLayout(
	items: OrganizerItem[],
	cols: number,
	strategy: OverlapStrategy,
	rowHeight: number,
): OrganizerItemRendered[] {
	if (strategy === 'calendar') return computeCalendarLayout(items, cols);
	if (strategy === 'calendar-v') return computeCalendarVLayout(items, cols, rowHeight);
	// 'compress' és 'expand': egyszerű pozicionálás, elemek egymáson (z-index kezeli)
	return items.map(item => baseLayout(item, cols));
}

export function overlaps(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }): boolean {
	return (
		a.x < b.x + b.w && a.x + a.w > b.x &&
		a.y < b.y + b.h && a.y + a.h > b.y
	);
}
