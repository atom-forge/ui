import type { GanttTask, FlatTask } from './gantt.types';

export function parseDate(s: string): Date {
	const [y, m, d] = s.split('-').map(Number);
	return new Date(y, m - 1, d);
}

export function formatDate(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

export function addDays(d: Date, n: number): Date {
	const r = new Date(d);
	r.setDate(r.getDate() + n);
	return r;
}

export function daysBetween(a: Date, b: Date): number {
	return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export function isWeekend(d: Date): boolean {
	const dow = d.getDay(); // 0=Sun, 6=Sat
	return dow === 0 || dow === 6;
}

export function isRestDay(d: Date, workdays: string, extraRest: string[], extraWork: string[]): boolean {
	const mmdd = `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
	if (extraWork.includes(mmdd)) return false;
	if (extraRest.includes(mmdd)) return true;
	// workdays string: "12345" = Mon-Fri (1=Mon…7=Sun or 0=Sun)
	const dow = d.getDay(); // 0=Sun…6=Sat
	// Convert to 1=Mon…7=Sun notation
	const dayNum = dow === 0 ? 7 : dow;
	return !workdays.includes(String(dayNum));
}

export function collectAllDates(tasks: GanttTask[]): { min: Date; max: Date } | null {
	let min: Date | null = null;
	let max: Date | null = null;

	function walk(ts: GanttTask[]) {
		for (const t of ts) {
			const s = parseDate(t.startDate);
			const e = parseDate(t.endDate);
			if (!min || s < min) min = s;
			if (!max || e > max) max = e;
			if (t.children) walk(t.children);
		}
	}
	walk(tasks);
	if (!min || !max) return null;
	return { min, max };
}

export function flattenTasks(
	tasks: GanttTask[],
	collapsedIds: Set<string>,
	parentId: string | null = null,
	depth = 0,
	result: FlatTask[] = [],
): FlatTask[] {
	for (const task of tasks) {
		const hasChildren = !!(task.children && task.children.length > 0);
		result.push({ task, depth, parentId, hasChildren, index: result.length });
		if (hasChildren && !collapsedIds.has(task.id)) {
			flattenTasks(task.children!, collapsedIds, task.id, depth + 1, result);
		}
	}
	return result;
}

export function findTaskById(tasks: GanttTask[], id: string): GanttTask | null {
	for (const t of tasks) {
		if (t.id === id) return t;
		if (t.children) {
			const found = findTaskById(t.children, id);
			if (found) return found;
		}
	}
	return null;
}

export function updateTaskInTree(tasks: GanttTask[], id: string, patch: Partial<GanttTask>): GanttTask[] {
	return tasks.map(t => {
		if (t.id === id) return { ...t, ...patch };
		if (t.children) return { ...t, children: updateTaskInTree(t.children, id, patch) };
		return t;
	});
}

export function deleteTaskFromTree(tasks: GanttTask[], id: string): GanttTask[] {
	return tasks
		.filter(t => t.id !== id)
		.map(t => t.children ? { ...t, children: deleteTaskFromTree(t.children, id) } : t);
}

export function addChildTask(tasks: GanttTask[], parentId: string | null, newTask: GanttTask): GanttTask[] {
	if (!parentId) return [...tasks, newTask];
	return tasks.map(t => {
		if (t.id === parentId) {
			return { ...t, children: [...(t.children ?? []), newTask] };
		}
		if (t.children) return { ...t, children: addChildTask(t.children, parentId, newTask) };
		return t;
	});
}

export function generateId(): string {
	return `task-${Math.random().toString(36).slice(2, 9)}`;
}

export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
