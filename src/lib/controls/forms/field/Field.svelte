<script lang="ts">
	import {twMerge} from 'tailwind-merge';
	import type {ClassProp, ChildrenProp} from '@atom-forge/svelte-helpers';
	import type {Snippet} from 'svelte';
	import {setFieldContext} from './field-context';

	let {
		label,
		info,
		hint,
		error,
		required = false,
		optional = false,
		layout = 'vertical',
		for: forId,
		children,
		labelSnippet,
		hintSnippet,
		errorSnippet,
		action,
		class: classes,
	}: ClassProp & ChildrenProp & {
		label?: string;
		info?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		optional?: boolean;
		layout?: 'vertical' | 'horizontal';
		for?: string;
		labelSnippet?: Snippet;
		hintSnippet?: Snippet;
		errorSnippet?: Snippet;
		action?: Snippet;
	} = $props();

	const isHorizontal = $derived(layout === 'horizontal');

	// ── Label ↔ control binding ───────────────────────────────────────────────
	// Without an explicit `for`, the first form control rendered inside the Field
	// claims a generated id, so the <label> is announced as the control's name.
	// The label always points at that id (also during SSR, before any claim happens).
	const uid = $props.id();
	const labelId = `${uid}-label`;
	const messageId = `${uid}-message`;
	const hasError = $derived(!!(error || errorSnippet));
	const hasMessage = $derived(hasError || !!(hint || hintSnippet));
	let claimed = $state(false);
	let controlId = $state(`${uid}-control`);
	const labelFor = $derived(forId ?? controlId);

	setFieldContext({
		claim(ownId) {
			if (forId !== undefined || claimed) return undefined;
			claimed = true;
			if (ownId) controlId = ownId;
			return {
				get id() { return controlId; },
				get labelId() { return label && !labelSnippet ? labelId : undefined; },
				get describedBy() { return hasMessage ? messageId : undefined; },
				get invalid() { return hasError; },
			};
		},
		release() {
			claimed = false;
			controlId = `${uid}-control`;
		},
	});
</script>

<!--
	In a FieldGroup (horizontal layout) this component exposes two grid children:
	  col 1 → label row
	  col 2 → control + meta row
	In vertical layout it's a simple flex column.
-->
{#if isHorizontal}
	<!-- label cell -->
	<div class={twMerge('flex items-center gap-1 pt-2 min-w-0', classes)}>
		{#if labelSnippet}
			{@render labelSnippet()}
		{:else if label}
			<label id={labelId} for={labelFor} class="text-sm text-muted-contrast leading-snug">
				{label}
				{#if required}<span class="text-error ml-0.5">*</span>{/if}
				{#if optional}<span class="text-muted-contrast text-xs ml-1">(optional)</span>{/if}
			</label>
		{/if}
		{#if info}
			<span class="ml-auto text-xs text-muted-contrast leading-snug">{info}</span>
		{/if}
		{#if action}
			<span class={!info ? 'ml-auto' : undefined}>{@render action()}</span>
		{/if}
	</div>
	<!-- control cell -->
	<div class="flex flex-col gap-1 min-w-0">
		{@render children()}
		{#if error || errorSnippet}
			<p id={messageId} class="text-xs text-error">
				{#if errorSnippet}{@render errorSnippet()}{:else}{error}{/if}
			</p>
		{:else if hint || hintSnippet}
			<p id={messageId} class="text-xs text-muted-contrast">
				{#if hintSnippet}{@render hintSnippet()}{:else}{hint}{/if}
			</p>
		{/if}
	</div>
{:else}
	<!-- vertical layout — single column -->
	<div class={twMerge('flex flex-col gap-1 min-w-0', classes)}>
		{#if label || labelSnippet || info || action}
			<div class="flex items-center gap-1">
				{#if labelSnippet}
					{@render labelSnippet()}
				{:else if label}
					<label id={labelId} for={labelFor} class="text-xs font-light text-muted-contrast leading-snug">
						{label}
						{#if required}<span class="text-error ml-0.5">*</span>{/if}
						{#if optional}<span class="text-muted-contrast text-xs ml-1">(optional)</span>{/if}
					</label>
				{/if}
				{#if info}
					<span class="ml-auto text-xs text-muted-contrast leading-snug">{info}</span>
				{/if}
				{#if action}
					<span class={!info ? 'ml-auto' : undefined}>{@render action()}</span>
				{/if}
			</div>
		{/if}

		{@render children()}

		{#if error || errorSnippet}
			<p id={messageId} class="text-xs text-error">
				{#if errorSnippet}{@render errorSnippet()}{:else}{error}{/if}
			</p>
		{:else if hint || hintSnippet}
			<p id={messageId} class="text-xs text-muted-contrast">
				{#if hintSnippet}{@render hintSnippet()}{:else}{hint}{/if}
			</p>
		{/if}
	</div>
{/if}
