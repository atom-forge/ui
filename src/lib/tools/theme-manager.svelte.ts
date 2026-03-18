import {getContext, setContext} from 'svelte';

const KEY = 'atom-forge:theme-manager';

class ThemeManager {
	dark: boolean = $state(false);
}

export function createThemeManager() {
	const manager = new ThemeManager();
	setContext(KEY, manager);
	return manager;
}

export const getThemeManager = () => getContext<ThemeManager>(KEY);
