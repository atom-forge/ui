import type {Component} from 'svelte';
import {getContext, setContext} from 'svelte';

export type DrawerPosition = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export type DrawerOptions = {
	position?: DrawerPosition;
	size?: DrawerSize;
	closable?: boolean; // Can be closed by clicking the backdrop
};

export type DrawerState = {
	component: Component<any, any, any>;
	props: any;
	options: DrawerOptions;
	resolver: (result: any) => void;
};

class DrawerManager {
	drawers = $state<DrawerState[]>([]);

	open<T, Args extends Record<string, any>>(component: Component<Args, any, any>, props?: Args, options: DrawerOptions = {}): Promise<T> {
		return new Promise<T>((resolve) => {
			const drawer: DrawerState = {
				component,
				props,
				options: {
					position: options.position || 'right',
					size: options.size || 'md',
					closable: options.closable !== false,
				},
				resolver: resolve
			};
			this.drawers = [...this.drawers, drawer];
		});
	}

	close(result?: any) {
		if (this.drawers.length === 0) return;
		const lastDrawer = this.drawers[this.drawers.length - 1];
		lastDrawer.resolver(result);
		this.drawers = this.drawers.slice(0, -1);
	}

	resolve(result?: any) {
		this.close(result);
	}
}

const KEY = 'atom-forge-ui:drawer-manager';

export function createDrawerManager() {
	const manager = new DrawerManager();
	setDrawerManager(manager);
}

export const getDrawerManager = () => getContext<DrawerManager>(KEY);
export const setDrawerManager = (manager: DrawerManager) => setContext(KEY, manager);
