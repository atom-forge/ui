import { getContext, setContext } from 'svelte';

export type AccordionSize = 'normal' | 'compact' | 'small';

export class AccordionManager {
	activeItems = $state<Set<string>>(new Set());

	constructor(
		public multiple: boolean,
		public size: AccordionSize,
		public borderless: boolean,
		public joined: boolean
	) {}

	toggleItem(id: string) {
		if (this.multiple) {
			const newSet = new Set(this.activeItems);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			this.activeItems = newSet;
		} else {
			this.activeItems = new Set(this.activeItems.has(id) ? [] : [id]);
		}
	}

	isItemActive(id: string): boolean {
		return this.activeItems.has(id);
	}
}

const ACCORDION_MANAGER_KEY = 'atom-forge:accordion-manager';

export function createAccordionManager(
	multiple: boolean,
	size: AccordionSize,
	borderless: boolean,
	joined: boolean
) {
	const manager = new AccordionManager(multiple, size, borderless, joined);
	setAccordionManager(manager);
	return manager;
}

export const getAccordionManager = () => getContext<AccordionManager>(ACCORDION_MANAGER_KEY);
export const setAccordionManager = (manager: AccordionManager) => setContext(ACCORDION_MANAGER_KEY, manager);
