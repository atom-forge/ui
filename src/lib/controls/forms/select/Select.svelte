<script lang="ts" module>
	import type {IconDefinition} from '../../general/icon';

	export type SelectOption = { value: string | number; label: any };
	export type SelectOptionsSource = SelectOption[] | {
		search: (query: string) => Promise<SelectOption[]>;
		get: (values: (string | number)[]) => Promise<SelectOption[]>;
	};
	export type SelectButtonTrigger = {
		label: string;
		icon?: IconDefinition;
		endIcon?: IconDefinition;
		secondary?: boolean;
		destructive?: boolean;
		ghost?: boolean;
		link?: boolean;
		muted?: boolean;
		accent?: boolean;
		outline?: boolean;
		pill?: boolean;
		borderless?: boolean;
	};
</script>

<script lang="ts">
	import type {Snippet} from 'svelte';
	import {untrack, onMount} from 'svelte'; // Added onMount
	import {twMerge} from 'tailwind-merge';
	import {ChevronDown, X} from 'lucide-svelte';
	import {Icon} from '../../general/icon';
	import {Button} from '../../general/button';
	import {getPopupManager} from '../../overlays/popup';
	import SelectDropdown from './SelectDropdown.svelte';
	import type {XOR, ClassProp} from '../../../index';

	let {
		value = $bindable(undefined),
		options = [],
		placeholder = 'Select...',
		disabled = false,
		searchable = true,
		button,
		hideKeyboardHints = false,
		clearable = false,
		compact,
		small,
		class: classes,
		option: optionSnippet,
		trigger: triggerSnippet,
	}: XOR<{ compact: true }, { small: true }, {}>
		& ClassProp
		& {
		value?: string | number;
		options: SelectOptionsSource;
		placeholder?: string;
		disabled?: boolean;
		searchable?: boolean;
		button?: SelectButtonTrigger;
		hideKeyboardHints?: boolean;
		clearable?: boolean;
		option?: Snippet<[SelectOption, boolean]>;
		trigger?: Snippet<[SelectOption]>;
	} = $props();

	const size = untrack(() => small ? 'small' : compact ? 'compact' : 'normal');
	const popupManager = getPopupManager();

	let triggerEl = $state<HTMLButtonElement>();
	let isOpen = $state(false);
	let cachedSelected = $state<SelectOption | undefined>(undefined);

	// New state for handling async options resolution
	let resolvedSelectedOption = $state<SelectOption | undefined>(undefined);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	// Effect to resolve initial value if options is an object with a 'get' function
	$effect(() => {
		if (!mounted || value === undefined) {
			resolvedSelectedOption = undefined;
			return;
		}

		if (typeof options === 'object' && options !== null && 'get' in options) {
			options.get([value]).then(resolvedOpts => {
				resolvedSelectedOption = resolvedOpts[0] || undefined;
			}).catch(error => {
				console.error("Failed to resolve initial selected option for Select:", error);
				resolvedSelectedOption = undefined;
			});
		} else {
			resolvedSelectedOption = undefined; // Reset if not using async options
		}
	});

	const selectedOption = $derived.by(() => {
		if (value === undefined) return undefined;

		if (Array.isArray(options)) {
			return options.find(o => o.value === value);
		} else if (typeof options === 'object' && options !== null && 'get' in options) {
			// If using async options, prefer the resolvedSelectedOption
			// Fallback to cachedSelected if resolvedSelectedOption is not yet available
			return resolvedSelectedOption || cachedSelected;
		}
		// Fallback for the old function-based options (though we are replacing it)
		return cachedSelected?.value === value ? cachedSelected : undefined;
	});

	async function openDropdown() {
		if (disabled || isOpen) return;
		isOpen = true;
		await popupManager.open.component(
			SelectDropdown,
			{
				options,
				value,
				searchable,
				hideKeyboardHints,
				onSelect: (opt: SelectOption) => {
					if (clearable && opt.value === value) {
						value = undefined;
						cachedSelected = undefined;
						resolvedSelectedOption = undefined; // Clear resolved as well
					} else {
						value = opt.value;
						cachedSelected = opt;
						resolvedSelectedOption = opt; // Update resolved as well
					}
				},
				optionSnippet,
			},
			{anchor: triggerEl!, align: 'both'},
		);
		isOpen = false;
	}

	function onTriggerKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openDropdown();
		}
	}

	const triggerCls = $derived(twMerge(
		'w-full flex items-center gap-2 px-3 rounded-[var(--radius-surface)] border bg-control text-left transition-colors',
		size === 'normal'  && 'h-10 text-sm',
		size === 'compact' && 'h-8 text-xs',
		size === 'small'   && 'h-6 text-xs px-2',
		isOpen ? 'border-accent ring-2 ring-accent/20' : 'border-frame',
		disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-accent',
		classes,
	));
</script>

{#if button}
	<Button
		bind:element={triggerEl}
		label={button.label}
		icon={button.icon}
		endIcon={button.endIcon}
		secondary={button.secondary}
		destructive={button.destructive}
		ghost={button.ghost}
		link={button.link}
		muted={button.muted}
		accent={button.accent}
		outline={button.outline}
		pill={button.pill}
		borderless={button.borderless}
		{compact}
		{small}
		{disabled}
		onclick={openDropdown}
		onkeydown={onTriggerKeydown}
		class={classes}
		aria-haspopup="listbox"
	/>
{:else}
	<button
		bind:this={triggerEl}
		onclick={openDropdown}
		onkeydown={onTriggerKeydown}
		class={triggerCls}
		{disabled}
	>
		<span class="flex-1 truncate min-w-0 {value !== undefined ? 'text-canvas-contrast' : 'text-muted-contrast'}">
			{#if selectedOption && triggerSnippet}
				{@render triggerSnippet(selectedOption)}
			{:else}
				{selectedOption?.label ?? (value !== undefined ? String(value) : placeholder)}
			{/if}
		</span>
		{#if clearable && value !== undefined}
			<!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
			<span
				role="button"
				tabindex="0"
				onclick={e => { e.stopPropagation(); value = undefined; cachedSelected = undefined; resolvedSelectedOption = undefined; }}
				class="text-muted-contrast hover:text-canvas-contrast shrink-0"
			>
				<Icon icon={X} pxSize={12}/>
			</span>
		{/if}
		<Icon
			icon={ChevronDown}
			pxSize={14}
			class={twMerge('text-muted-contrast shrink-0 transition-transform duration-150', isOpen && 'rotate-180')}
		/>
	</button>
{/if}
