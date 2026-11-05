import {getContext, onDestroy, setContext} from 'svelte';

const FIELD_CONTEXT_KEY = Symbol('atom-forge-field');

/** Ids a form control receives from its surrounding `Field`. */
export type FieldControl = {
	/** Id to put on the control's focusable / labelable element. */
	readonly id: string;
	/** Id of the rendered `<label>` element, or `undefined` when the Field renders no label. */
	readonly labelId: string | undefined;
	/** Id of the rendered error or hint text, or `undefined` when the Field shows neither. Use as `aria-describedby`. */
	readonly describedBy: string | undefined;
	/** `true` while the Field shows an error. Use as `aria-invalid`. */
	readonly invalid: boolean;
};

type FieldContext = {
	claim(ownId?: string): FieldControl | undefined;
	release(): void;
};

/**
 * Called by `Field`. Exposes the label / description ↔ control binding to the first form control
 * rendered inside it. Pass `undefined` to shadow an outer Field's context.
 */
export function setFieldContext(context: FieldContext | undefined) {
	setContext(FIELD_CONTEXT_KEY, context);
}

/**
 * Called by form controls during initialisation. Returns the ids the control should use
 * so the surrounding Field's `<label>` is bound to it. Only the first control inside a
 * Field claims the binding; further controls (and controls outside a Field) get `undefined`.
 *
 * @param ownId An explicit id set by the consumer on the control. The Field's label
 *              then points at this id instead of the generated one.
 */
export function useFieldControl(ownId?: string): FieldControl | undefined {
	const context = getContext<FieldContext | undefined>(FIELD_CONTEXT_KEY);
	const control = context?.claim(ownId);
	if (control) onDestroy(() => context!.release());
	return control;
}
