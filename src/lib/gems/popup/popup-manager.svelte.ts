import {RenderSnippet} from "$lib";
import type {Component, Snippet} from 'svelte';
import {getContext, setContext} from "svelte";

export type PopupAlign = 'auto' | 'left' | 'right' | 'both' | 'side';

export type Popup = {
	component: Component<any, any, any>
	params: any
	resolver: (result: any) => void
	promise: Promise<any>; // The promise itself
	event?: MouseClientEvent
	anchor?: Element
	align?: PopupAlign
	offset?: number
	ref?: any;
}

export type MouseClientEvent = {
	clientX: number
	clientY: number
}
type PosArgsType = { pos: MouseClientEvent, anchor?: never, align?: never }
type AnchorArgsType = { pos?: never, anchor: Element | { currentTarget: EventTarget | null }, align?: PopupAlign }

type OpenArgsType = (PosArgsType | AnchorArgsType) & { offset?: number}


export class PopupManager {
	popup: Popup | undefined = $state(undefined);
	ignoreClose = false;
	closeTimeout: number | null = null;

	constructor(readonly parent?: PopupManager) {}


	open = {
		snippet: <Params extends Record<string, any>>(
			snippet: Snippet<[Params]>,
			params: Params,
			args: OpenArgsType,
			ref?: any
		) => this.openPopup(RenderSnippet, {snippet: snippet as Snippet, args:params}, args.pos, args.anchor, args.align, args.offset, ref),
		component: <Params extends Record<string, any>>(
			component: Component<Params, any, any>,
			params: Params,
			args: OpenArgsType,
			ref?: any
		) => this.openPopup(component, params, args.pos, args.anchor, args.align, args.offset, ref)
	}

	private openPopup<Params extends Record<string, any>>(
		component: Component<Params, any, any>,
		params: Params,
		event?: MouseClientEvent,
		anchor?: Element | { currentTarget: EventTarget | null },
		align: PopupAlign = 'auto',
		offset?: number,
		ref?: any
	): Promise<any> {

		if (this.popup && ref !== undefined && this.popup?.ref === ref) {
			return this.popup.promise;
		}

		if (this.popup) this.close();
		this.ignoreClose = true;
		setTimeout(() => this.ignoreClose = false, 100);
		let resolver: (result: any) => any = () => {};
		const promise = new Promise((resolve) => {resolver = resolve;});

		if (anchor) {
			if ('currentTarget' in anchor) {
				if (anchor.currentTarget === null) throw new Error("Could not resolve popup anchor.")
				if (!(anchor.currentTarget instanceof Element)) throw new Error("Could not resolve popup anchor.")
				anchor = anchor.currentTarget;
			}
		}
		setTimeout(
			() => this.popup = {component, params, resolver, promise, event, anchor, align, offset, ref},
			this.popup ? 200 : 0,
		);
		return promise;
	}

	close() {
		if (this.popup && this.closeTimeout === null && !this.ignoreClose) {
			this.closeTimeout = window.setTimeout(() => {
				this.popup?.resolver(undefined);
				this.popup = undefined;
				this.closeTimeout = null;
			}, 10);
		}
	}

	closeRoot() {
		let rootManager = this as PopupManager;
		while (rootManager.parent) rootManager = rootManager.parent;
		rootManager.close();
	}

	resolve(result?: any) {
		this.popup?.resolver(result);
		this.popup = undefined;
		this.closeTimeout = null;
	}

	resolveRoot(result?: any) {
		let rootManager = this as PopupManager;
		while (rootManager.parent) rootManager = rootManager.parent;
		rootManager.resolve(result);
	}
}


const POPUP_MANAGER_KEY = 'atom-forge:popup-manager';
export function setPopupManager(popupManager: PopupManager) { setContext(POPUP_MANAGER_KEY, popupManager);}
export function getPopupManager() {return getContext<PopupManager>(POPUP_MANAGER_KEY);}
export function createPopupManager(parent?: PopupManager) {
	let popupManager = new PopupManager(parent);
	setPopupManager(popupManager);
	return popupManager;
}
