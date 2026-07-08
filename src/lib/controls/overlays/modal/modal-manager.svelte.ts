import {RenderSnippet} from '../../../index';
import type {Component, Snippet} from 'svelte';
import {getContext, setContext} from 'svelte';
import {getOverlayStackManager, type OverlayOptions, type OverlayStackManager, type OverlayState} from '../shared/overlay-manager.svelte';

export type ModalOptions = OverlayOptions;
export type ModalState = OverlayState<ModalOptions>;

type ModalOpenOptions = ModalOptions | string;

function normalizeModalOptions(options?: ModalOptions): ModalOptions & Required<Pick<OverlayOptions, 'closable'>> {
	return {
		...options,
		closable: options?.closable !== false
	};
}

function toModalOptions(options?: ModalOpenOptions): ModalOptions | undefined {
	if (typeof options === 'string') return {key: options};
	return options;
}

class ModalManagerFacade {
	constructor(private readonly manager: OverlayStackManager) {}

	get modals() {
		return this.manager.itemsOfKind<ModalOptions>('modal');
	}

	open<Result = any, Props extends Record<string, any> = Record<string, any>>(
		component: Component<Props, any, any>,
		props?: Props,
		options?: ModalOpenOptions
	): Promise<Result> {
		return this.manager.open<Result, Props, ModalOptions>('modal', component, props, normalizeModalOptions(toModalOptions(options)));
	}

	openSnippet<Args extends Record<string, any>>(snippet: Snippet<[Args]>, props?: Args, options?: ModalOpenOptions): Promise<any> {
		return this.open(RenderSnippet, {snippet: snippet as Snippet, args: props} as any, options);
	}

	close(result?: any) {
		this.manager.close('modal', result);
	}

	resolve(result?: any) {
		this.manager.resolve('modal', result);
	}

	closeTopmostIfClosable(result?: any) {
		this.manager.closeTopmostIfClosable(result);
	}

	isTopmost(modal: ModalState | undefined) {
		return this.manager.isTopmost(modal);
	}
};

const KEY = 'atom-forge:modal-manager';

export function createModalManager() {
	const manager = getOverlayStackManager();
	setModalManager(manager);
	return manager;
}

export const getModalManager = () => new ModalManagerFacade(getContext<OverlayStackManager>(KEY));
export const setModalManager = (manager: OverlayStackManager) => setContext(KEY, manager);
