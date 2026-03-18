import {RenderSnippet} from '$lib';
import type {Component, Snippet} from 'svelte';
import {getContext, setContext} from 'svelte';

export type ModalState = {
	component: Component<any, any, any>;
	props: any;
	resolver: (result: any) => void;
	key?: string;
};

class ModalManager {
	modals: ModalState[] = $state([]);

	open<Props extends Record<string, any>>(component: Component<Props, any, any>, props?: Props, key?: string): Promise<any> {
		if (key && this.modals.some(m => m.key === key)) return Promise.resolve(undefined);
		return new Promise((resolve) => {
			console.log("open", props)
			const modal: ModalState = {component, props, resolver: resolve, key};
			this.modals = [...this.modals, modal];
		});
	}

	openSnippet<Args extends Record<string, any>>(snippet: Snippet<[Args]>, props?: Args): Promise<any> {
		console.log("openSnippet", props)
		return this.open(RenderSnippet, {snippet: snippet as Snippet, args: props} as any);
	}

	close(result?: any) {
		if (this.modals.length === 0) return;

		const lastModal = this.modals[this.modals.length - 1];
		lastModal.resolver(result);
		this.modals = this.modals.slice(0, -1);
	}

	resolve(result?: any) {
		if (this.modals.length === 0) return;

		const lastModal = this.modals[this.modals.length - 1];
		lastModal.resolver(result);
		this.modals = this.modals.slice(0, -1);
	}
}

const KEY = 'atom-forge:modal-manager';

export function createModalManager() {
	const manager = new ModalManager();
	setModalManager(manager);
}

export const getModalManager = () => getContext<ModalManager>(KEY);
export const setModalManager = (manager: ModalManager) => setContext(KEY, manager);