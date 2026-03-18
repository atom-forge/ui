import {type Component, getContext, setContext} from 'svelte';
import {type IconDefinition} from "$lib/gems/icon";

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastOptions = {
	type?: ToastType;
	duration?: number; // ms
	closable?: boolean;
	icon?: IconDefinition;
	action?: {
		label: string;
		callback: () => void;
	};
};

export type ToastState = {
	id: string;
	message: string;
	options?: ToastOptions;
	component?: Component; // For custom toast components
	props?: Record<string, any>; // Props for custom component
};

class ToastManager {
	toasts = $state<ToastState[]>([]);

	show(message: string, options?: ToastOptions) {
		const id = crypto.randomUUID();
		const newToast: ToastState = {id, message, options};
		this.toasts = [...this.toasts, newToast];

		if (options?.duration !== 0) { // duration = 0 means infinite
			setTimeout(() => this.dismiss(id), options?.duration || 3000);
		}
		return id;
	}

	dismiss(id: string) {
		this.toasts = this.toasts.filter(toast => toast.id !== id);
	}

	// For custom toast components (advanced usage)
	showCustom(component: Component, props: Record<string, any>, options?: ToastOptions) {
		const id = crypto.randomUUID();
		const newToast: ToastState = {id, message: '', options, component, props};
		this.toasts = [...this.toasts, newToast];

		if (options?.duration !== 0) {
			setTimeout(() => this.dismiss(id), options?.duration || 3000);
		}
		return id;
	}
}

const KEY = 'atom-forge-ui:toast-manager';

export function createToastManager() {
	const manager = new ToastManager();
	setToastManager(manager);
	return manager;
}

export const getToastManager = () => getContext<ToastManager>(KEY);
export const setToastManager = (manager: ToastManager) => setContext(KEY, manager);
