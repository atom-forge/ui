import type {Component} from 'svelte';
import {getContext, setContext} from 'svelte';
import {getOverlayStackManager, type OverlayOptions, type OverlayStackManager, type OverlayState} from '../shared/overlay-manager.svelte';

export type DrawerPosition = 'left' | 'right';
export type DrawerSize = 'normal' | 'compact' | 'small';

export type DrawerOptions = OverlayOptions & {
	position?: DrawerPosition;
	size?: DrawerSize;
};

export type DrawerState = OverlayState<DrawerOptions>;

function normalizeDrawerOptions(options: DrawerOptions = {}): DrawerOptions & Required<Pick<OverlayOptions, 'closable'>> & Required<Pick<DrawerOptions, 'position' | 'size'>> {
	return {
		...options,
		position: options.position || 'right',
		size: options.size || 'normal',
		closable: options.closable !== false
	};
}

class DrawerManagerFacade {
	constructor(private readonly manager: OverlayStackManager) {}

	get drawers() {
		return this.manager.itemsOfKind<DrawerOptions>('drawer');
	}

	open<T, Args extends Record<string, any>>(component: Component<Args, any, any>, props?: Args, options?: DrawerOptions): Promise<T> {
		return this.manager.open<T, Args, DrawerOptions>('drawer', component, props, normalizeDrawerOptions(options));
	}

	close(result?: any) {
		this.manager.close('drawer', result);
	}

	resolve(result?: any) {
		this.manager.resolve('drawer', result);
	}

	closeTopmostIfClosable(result?: any) {
		this.manager.closeTopmostIfClosable(result);
	}

	isTopmost(drawer: DrawerState | undefined) {
		return this.manager.isTopmost(drawer);
	}
}

const KEY = 'atom-forge:drawer-manager';

export function createDrawerManager() {
	const manager = getOverlayStackManager();
	setDrawerManager(manager);
	return manager;
}

export const getDrawerManager = () => new DrawerManagerFacade(getContext<OverlayStackManager>(KEY));
export const setDrawerManager = (manager: OverlayStackManager) => setContext(KEY, manager);
