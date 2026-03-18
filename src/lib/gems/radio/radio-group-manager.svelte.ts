import {getContext, setContext} from "svelte";

export type RadioVariant = 'default' | 'primary' | 'accent';

class RadioGroupManager {
	value: any = $state();
	constructor(
		initialValue: any,
		readonly size?: 'small' | 'compact' | 'normal',
		readonly variant?: RadioVariant,
	) {
		this.value = initialValue;
	}
}

const KEY = 'atom-forge:radio-group-manager';

export function createRadioGroupManager(initialValue: any, size?: 'small' | 'compact' | 'normal', variant?: RadioVariant) {
	const manager = new RadioGroupManager(initialValue, size, variant);
	setRadioGroupManager(manager);
	return manager;
}

export const getRadioGroupManager = () => getContext<RadioGroupManager>(KEY);
export const setRadioGroupManager = (manager: RadioGroupManager) => setContext(KEY, manager);