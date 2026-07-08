import type {Component} from 'svelte';
import {getContext, setContext} from 'svelte';

export type OverlayOptions = {
	closable?: boolean;
	key?: string;
};

export type OverlayKind = 'modal' | 'drawer';

export type OverlayState<Options extends OverlayOptions = OverlayOptions> = {
	id: number;
	kind: OverlayKind;
	component: Component<any, any, any>;
	props: any;
	options: Options & Required<Pick<OverlayOptions, 'closable'>>;
	resolver: (result: any) => void;
	key?: string;
};

let nextOverlayId = 0;

export class OverlayStackManager {
	items = $state<OverlayState[]>([]);

	open<Result, Props extends Record<string, any>, Options extends OverlayOptions>(
		kind: OverlayKind,
		component: Component<Props, any, any>,
		props: Props | undefined,
		options: Options & Required<Pick<OverlayOptions, 'closable'>>
	): Promise<Result> {
		const key = options.key;

		if (key && this.items.some(item => item.kind === kind && item.key === key)) {
			return Promise.resolve(undefined as Result);
		}

		return new Promise<Result>((resolve) => {
			const overlay: OverlayState<Options> = {
				id: ++nextOverlayId,
				kind,
				component,
				props,
				options,
				resolver: resolve,
				key
			};

			this.items = [...this.items, overlay];
		});
	}

	close(kind: OverlayKind, result?: any) {
		const last = this.lastOfKind(kind);
		if (!last) return;

		this.resolveItem(last, result);
	}

	resolve(kind: OverlayKind, result?: any) {
		this.close(kind, result);
	}

	closeTopmostIfClosable(result?: any) {
		const last = this.topmost();
		if (!last || !last.options.closable) return;
		this.resolveItem(last, result);
	}

	closeAll(result?: any) {
		const items = this.items;
		this.items = [];
		for (const item of items) {
			item.resolver(result);
		}
	}

	closeItemIfTopmost(item: OverlayState | undefined, result?: any) {
		if (!item || !item.options.closable || !this.isTopmost(item)) return;
		this.resolveItem(item, result);
	}

	isTopmost(item: OverlayState | undefined) {
		if (!item) return false;
		return this.topmost()?.id === item.id;
	}

	itemsOfKind<Options extends OverlayOptions>(kind: OverlayKind) {
		return this.items.filter((item): item is OverlayState<Options> => item.kind === kind);
	}

	private topmost() {
		return this.items[this.items.length - 1];
	}

	private lastOfKind(kind: OverlayKind) {
		return this.items.findLast(item => item.kind === kind);
	}

	private resolveItem(item: OverlayState, result?: any) {
		item.resolver(result);
		this.items = this.items.filter(current => current.id !== item.id);
	}
}

const STACK_KEY = 'atom-forge:overlay-stack-manager';

export function getOverlayStackManager() {
	let manager = getContext<OverlayStackManager | undefined>(STACK_KEY);
	if (!manager) {
		manager = new OverlayStackManager();
		setOverlayStackManager(manager);
	}
	return manager;
}

export const setOverlayStackManager = (manager: OverlayStackManager) => setContext(STACK_KEY, manager);
export const overlayZIndex = (index: number) => 9000 + index * 20;
