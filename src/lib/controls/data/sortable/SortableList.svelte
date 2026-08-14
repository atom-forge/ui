<script module lang="ts">
	export type SortableChangeDetail<T extends { id: string | number }> = {
		items: T[];
		previousItems: T[];
		item: T | undefined;
		itemId: string | number;
		fromIndex: number;
		toIndex: number;
		trigger: string;
		source: string;
	};
</script>

<script lang="ts" generics="T extends { id: string | number }">
	import {flip} from "svelte/animate";
	import type {ActionReturn} from "svelte/action";
	import {getContext} from "svelte";
	import {
		dndzone,
		dragHandle,
		dragHandleZone,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
		type DndEvent,
		type Options,
	} from "svelte-dnd-action";
	import {twMerge} from "tailwind-merge";
	import EmptyState from "../../display/empty-state/EmptyState.svelte";
	import type {IconDefinition} from "../../general/icon";
	import type {GroupContext} from "./SortableGroup.svelte";
	import type {Snippet} from "svelte";

	type Orientation = "vertical" | "horizontal" | "grid";

	interface EmptyStateProps {
		icon: IconDefinition;
		title: string;
		description?: string;
	}

	interface Props {
		class?: string;
		id?: string;
		items: T[];
		orientation?: Orientation;
		grabbedClass?: string;
		draggingClass?: string;
		dropIndicatorClass?: string;
		preservePreviewSize?: boolean;
		previewOffset?: (args: { container: HTMLElement }) => { x: number; y: number };
		/** CSS selector for a drag handle inside each item. If provided, drag starts only from that element. */
		dragHandleSelector?: string;
		flipDurationMs?: number;
		onchange?: (items: T[], detail: SortableChangeDetail<T>) => void;
		item: Snippet<[T]>;
		dropIndicator?: Snippet<[T | undefined]>;
		empty?: EmptyStateProps;

		[key: string]: unknown;
	}

	let {
		class: classes,
		items = $bindable([]),
		id = "default-list",
		orientation = "vertical",
		grabbedClass = "shadow-xl opacity-95 scale-[1.01]",
		draggingClass = "opacity-35",
		dropIndicatorClass,
		preservePreviewSize = true,
		previewOffset,
		dragHandleSelector,
		flipDurationMs = 160,
		onchange,
		item: itemSnippet,
		dropIndicator: dropIndicatorSnippet,
		empty,
		...props
	}: Props = $props();

	type SortableItem = T & Record<string, unknown>;
	type SortableActionOptions = Options<SortableItem>;
	type SortableZoneParams = {options: SortableActionOptions; dragHandleSelector?: string};
	type SortableZoneAttributes = {
		onconsider?: (event: CustomEvent<DndEvent<SortableItem>>) => void;
		onfinalize?: (event: CustomEvent<DndEvent<SortableItem>>) => void;
	};
	type SortableAction = {
		update?: (options: SortableActionOptions) => void;
		destroy?: () => void;
	};
	type HandleAction = ReturnType<typeof dragHandle>;

	const groupCtx = getContext<GroupContext | undefined>("dnd-group");

	let draggingId = $state<string | number | null>(null);
	let displayItems = $state<SortableItem[]>(items as SortableItem[]);
	let dragStartItems = $state<SortableItem[]>(items as SortableItem[]);

	const cls = $derived(
		twMerge(
			"flex",
			orientation === "vertical" ? "flex-col" : "flex-row",
			orientation === "grid" ? "flex-wrap" : "",
			classes,
		),
	);

	const zoneType = $derived(groupCtx?.dndType ?? `sortable-list-${id}`);

	const dndOptions = $derived<SortableActionOptions>({
		items: displayItems,
		type: zoneType,
		flipDurationMs,
		dropTargetStyle: {},
		zoneTabIndex: -1,
		zoneItemTabIndex: 0,
		transformDraggedElement,
	});

	function isShadowItem(item: SortableItem) {
		return Boolean(item?.[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
	}

	function withoutShadowItems(nextItems: SortableItem[]) {
		return nextItems.filter(item => !isShadowItem(item));
	}

	function haveItemsChanged(previousItems: SortableItem[], nextItems: SortableItem[]) {
		if (previousItems.length !== nextItems.length) return true;
		return previousItems.some((item, index) => item.id !== nextItems[index]?.id);
	}

	function emitChange(nextItems: SortableItem[], event: CustomEvent<DndEvent<SortableItem>>) {
		const previousItems = withoutShadowItems(dragStartItems);
		if (!haveItemsChanged(previousItems, nextItems)) return;

		const itemId = event.detail.info.id;
		const item = previousItems.find(candidate => candidate.id === itemId)
			?? nextItems.find(candidate => candidate.id === itemId);

		onchange?.(nextItems as T[], {
			items: nextItems as T[],
			previousItems: previousItems as T[],
			item: item as T | undefined,
			itemId,
			fromIndex: previousItems.findIndex(candidate => candidate.id === itemId),
			toIndex: nextItems.findIndex(candidate => candidate.id === itemId),
			trigger: event.detail.info.trigger,
			source: event.detail.info.source,
		});
	}

	$effect(() => {
		if (draggingId === null) {
			displayItems = items as SortableItem[];
			dragStartItems = items as SortableItem[];
		}
	});

	function handleDnd(event: CustomEvent<DndEvent<SortableItem>>) {
		if (draggingId === null) {
			dragStartItems = items as SortableItem[];
		}
		draggingId = event.detail.info.id;
		displayItems = event.detail.items;
	}

	function handleFinalize(event: CustomEvent<DndEvent<SortableItem>>) {
		const nextItems = withoutShadowItems(event.detail.items);
		items = nextItems as T[];
		displayItems = nextItems;
		emitChange(nextItems, event);
		dragStartItems = nextItems;
		draggingId = null;
	}

	function transformDraggedElement(element?: HTMLElement) {
		if (!element) return;

		element.style.outline = "none";
		element.style.boxShadow = "none";

		const target = element.firstElementChild instanceof HTMLElement
			? element.firstElementChild
			: element;

		target.style.outline = "none";

		if (grabbedClass) {
			target.className = twMerge(target.className, grabbedClass);
		}
	}

	function sortableZone(
		node: HTMLElement,
		params: SortableZoneParams,
	): ActionReturn<SortableZoneParams, SortableZoneAttributes> {
		let zoneAction: SortableAction | undefined;
		let handleActions = new Map<Element, HandleAction>();
		let usingHandles = false;

		function destroyHandles() {
			handleActions.forEach(action => action.destroy());
			handleActions.clear();
		}

		function syncHandles(selector?: string) {
			if (!selector) {
				destroyHandles();
				return;
			}

			const nextHandles = new Set<Element>();
			node.querySelectorAll(selector).forEach(handleNode => {
				nextHandles.add(handleNode);
				if (!handleActions.has(handleNode)) {
					handleActions.set(handleNode, dragHandle(handleNode as HTMLElement));
				}
			});

			handleActions.forEach((action, handleNode) => {
				if (!nextHandles.has(handleNode)) {
					action.destroy();
					handleActions.delete(handleNode);
				}
			});
		}

		function scheduleHandleSync(selector?: string) {
			if (!selector) return;
			queueMicrotask(() => syncHandles(selector));
		}

		function updateHandles(selector?: string) {
			if (!selector) {
				destroyHandles();
				return;
			}

			syncHandles(selector);
			scheduleHandleSync(selector);
		}

		function createZone(nextParams: SortableZoneParams) {
			usingHandles = Boolean(nextParams.dragHandleSelector);
			zoneAction = usingHandles
				? dragHandleZone(node, nextParams.options)
				: dndzone(node, nextParams.options);
			updateHandles(nextParams.dragHandleSelector);
		}

		createZone(params);

		return {
			update(nextParams: SortableZoneParams) {
				const shouldUseHandles = Boolean(nextParams.dragHandleSelector);

				if (shouldUseHandles !== usingHandles) {
					zoneAction?.destroy?.();
					createZone(nextParams);
					return;
				}

				zoneAction?.update?.(nextParams.options);
				updateHandles(nextParams.dragHandleSelector);
			},
			destroy() {
				destroyHandles();
				zoneAction?.destroy?.();
			},
		};
	}
</script>

<div
	class={cls}
	{...props}
	use:sortableZone={{options: dndOptions, dragHandleSelector}}
	onconsider={handleDnd}
	onfinalize={handleFinalize}
>
	{#if displayItems.length === 0 && empty}
		<EmptyState icon={empty.icon} title={empty.title} description={empty.description}/>
	{/if}

	{#each displayItems as sortableItem (sortableItem.id)}
		<div
			class={twMerge(
				"transition-[opacity,transform,filter] duration-150",
				draggingId === sortableItem.id && !isShadowItem(sortableItem as SortableItem) ? draggingClass : "",
				isShadowItem(sortableItem as SortableItem) && dropIndicatorClass ? dropIndicatorClass : "",
			)}
			data-dnd-id={sortableItem.id}
			data-dnd-list={id}
			data-is-dnd-shadow-item-hint={isShadowItem(sortableItem as SortableItem)}
			animate:flip={{duration: flipDurationMs}}
		>
			{#if isShadowItem(sortableItem as SortableItem) && dropIndicatorSnippet}
				{@render dropIndicatorSnippet(sortableItem as T)}
			{:else}
				{@render itemSnippet(sortableItem as T)}
			{/if}
		</div>
	{/each}
</div>
