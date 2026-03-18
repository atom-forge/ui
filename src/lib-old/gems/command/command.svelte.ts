import type { IconDefinition } from '$lib/gems/icon';

/**
 * Egyetlen parancsot leíró objektum.
 */
export type CommandItem = {
	id: string;
	label: string;
	description?: string;
	group?: string;
	icon?: IconDefinition;
	keywords?: string[];
	onSelect: (item: CommandItem) => void;
};
