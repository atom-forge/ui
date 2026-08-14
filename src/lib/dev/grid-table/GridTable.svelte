<script lang="ts" generics="T extends Record<string, any>">
	import type {ClassProp} from '../../helpers/types';
	import {twMerge} from 'tailwind-merge';
	import type {GridTableColumnDef, GridTableDividers, GridTableSort, GridTableStylingFn} from './types';
	import {getPopupManager} from '../../controls/overlays/popup';
	import TableSettings from '../../controls/data/table/TableSettings.svelte';
	import type {ColumnDef} from '../../controls/data/table/types';
	import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-svelte';

	const popupManager = getPopupManager();

	let {
		data,
		columns = $bindable(),
		rowStyle,
		rowClick,
		sort = $bindable([]),
		sortChange,
		columnsEditable = false,
		hideHeader = false,
		frameless = false,
		dividers = true,
		noScroll = false,
		hoverCell = false,
		hoverRow = false,
		hoverColumn = false,
		fixedFirstColumn = false,
		compact = false,
		small = false,
		headerClass: headerClasses = '',
		class: classes = ''
	}: ClassProp & {
		data: T[]
		columns: GridTableColumnDef<T>[]
		rowStyle?: string | GridTableStylingFn<T>
		rowClick?: (row: T, table: T[], index: number, event: MouseEvent | KeyboardEvent) => void
		sort?: GridTableSort<T> | null
		sortChange?: (sort: GridTableSort<T>) => void
		columnsEditable?: boolean
		hideHeader?: boolean
		frameless?: boolean
		dividers?: GridTableDividers
		noScroll?: boolean
		hoverCell?: boolean
		hoverRow?: boolean
		hoverColumn?: boolean
		fixedFirstColumn?: boolean
		compact?: boolean
		small?: boolean
		headerClass?: string
	} = $props();

	let hoveredCell = $state<{ row: number; column: number } | null>(null);
	let hoveredRow = $state<number | null>(null);
	let hoveredColumn = $state<number | null>(null);

	const visibleColumns = $derived(columns.filter((column) => column.visible !== false));
	const activeSort = $derived(sort ?? []);

	const defaultFlexibleMinWidth = '8rem';
	const fillColumns = $derived(visibleColumns.filter((column) => column.sizing === 'fill'));
	const fallbackFillKey = $derived.by(() => {
		if (fillColumns.length > 0) return null;

		for (let i = visibleColumns.length - 1; i >= 0; i--) {
			const column = visibleColumns[i];
			if ((column.sizing ?? 'truncate') === 'truncate') {
				return column.key;
			}
		}

		return null;
	});

	$effect(() => {
		if (fillColumns.length > 1) {
			console.warn('GridTable expects at most one column with sizing="fill". Extra fill columns will share remaining space.');
		}
	});

	function getFlexibleMinWidth(column: GridTableColumnDef<T>) {
		return column.minWidth ?? defaultFlexibleMinWidth;
	}

	function getTrack(column: GridTableColumnDef<T>) {
		if (column.sizing === 'fill' || column.key === fallbackFillKey) {
			return `minmax(${getFlexibleMinWidth(column)}, 1fr)`;
		}

		switch (column.sizing ?? 'truncate') {
			case 'content':
				return column.width ?? 'max-content';
			case 'truncate':
			default:
				return `minmax(${getFlexibleMinWidth(column)}, ${column.width ?? 'max-content'})`;
		}
	}

	const gridTemplateColumns = $derived(visibleColumns.map(getTrack).join(' '));

	const wrapperClass = $derived(twMerge(
		'relative max-h-full max-w-full min-w-0 overflow-y-auto',
		noScroll ? 'overflow-x-hidden' : 'overflow-x-auto',
		!frameless && 'border border-frame rounded-surface',
		classes,
	));

	const gridClass = $derived(twMerge(
		'grid text-left text-sm text-canvas-contrast',
		noScroll ? 'w-full min-w-0' : 'w-fit min-w-full',
	));
	const headerCellClass = $derived(twMerge(
		'sticky top-0 z-20 min-w-0 bg-secondary px-3 font-medium uppercase text-canvas-contrast transition-colors duration-200',
		dividers === true && 'border-b border-frame',
		small ? 'py-1 text-xs' : compact ? 'py-1.5 text-sm' : 'py-3 text-xs',
	));
	const headerContentClass = 'flex min-w-0 items-center gap-1';
	const sortMarkerClass = 'shrink-0 text-accent';
	const cellClass = 'grid min-w-0 bg-surface transition-colors duration-200';
	const cellInnerClass = $derived(twMerge(
		'relative m-0.5 flex min-w-0 items-center rounded-control-sm px-2.5 transition-colors duration-200',
		small ? 'py-1 text-xs' : compact ? 'py-1.5 text-sm' : 'py-2.5 text-sm',
	));
	const cellHoverOverlayClass = 'pointer-events-none absolute inset-0 rounded-control-sm transition-colors duration-200';
	const cellContentClass = 'relative z-10 min-w-0';
	const fixedFirstColumnHeaderClass = 'sticky left-0 z-30 border-r border-frame';
	const fixedFirstColumnCellClass = 'sticky left-0 z-20 border-r border-frame bg-surface';

	function getOverflowClass(column: GridTableColumnDef<T>) {
		if ((column.sizing ?? 'truncate') === 'content') {
			return 'whitespace-nowrap overflow-hidden text-clip';
		}

		switch (column.overflow ?? 'ellipsis') {
			case 'wrap':
				return 'whitespace-normal break-words overflow-visible';
			case 'clip':
				return 'whitespace-nowrap overflow-hidden text-clip';
			case 'ellipsis':
			default:
				return 'whitespace-nowrap overflow-hidden text-ellipsis';
		}
	}

	function getHeaderHoverClass(columnIndex: number) {
		if (!hoverColumn || hoveredColumn !== columnIndex) return '';
		return 'text-accent';
	}

	function getHeaderInteractionClass(column: GridTableColumnDef<T>) {
		if (column.sortable) return 'cursor-pointer select-none';
		if (columnsEditable) return 'cursor-context-menu';
		return 'cursor-default';
	}

	function getAriaSort(column: GridTableColumnDef<T>) {
		if (!column.sortable) return undefined;
		const sortIndex = getSortIndex(column);
		if (sortIndex === -1) return 'none';
		if (sortIndex > 0) return 'other';

		const sortRule = activeSort[sortIndex];
		return sortRule.direction === 'asc' ? 'ascending' : 'descending';
	}

	function getSortRule(column: GridTableColumnDef<T>) {
		return activeSort.find((sortRule) => sortRule.key === column.key);
	}

	function getPrimarySortRule(column: GridTableColumnDef<T>) {
		const primarySort = activeSort[0];
		if (primarySort?.key !== column.key) return undefined;
		return primarySort;
	}

	function getSortIndex(column: GridTableColumnDef<T>) {
		return activeSort.findIndex((sortRule) => sortRule.key === column.key);
	}

	function getCellHoverOverlayClass(rowIndex: number, columnIndex: number) {
		const classes = [];

		if (hoverRow && hoveredRow === rowIndex) {
			classes.push('bg-secondary');
		}

		if (hoverCell && hoveredCell?.row === rowIndex && hoveredCell.column === columnIndex) {
			classes.push('bg-muted');
		}

		return classes.join(' ');
	}

	function getCellDividerClass(isLastRow: boolean) {
		if (dividers !== true || isLastRow) return '';
		return 'border-b border-frame';
	}

	function getAlternateRowClass(rowIndex: number) {
		if (dividers !== 'alternate' || rowIndex % 2 === 0) return '';
		return 'bg-surface-primary';
	}

	function onCellMouseenter(rowIndex: number, columnIndex: number) {
		if (hoverCell) hoveredCell = {row: rowIndex, column: columnIndex};
		if (hoverRow) hoveredRow = rowIndex;
		if (hoverColumn) hoveredColumn = columnIndex;
	}

	function onCellMouseleave(rowIndex: number, columnIndex: number) {
		if (hoveredCell?.row === rowIndex && hoveredCell.column === columnIndex) {
			hoveredCell = null;
		}
		if (hoveredRow === rowIndex) {
			hoveredRow = null;
		}
		if (hoveredColumn === columnIndex) {
			hoveredColumn = null;
		}
	}

	function onHeaderMouseenter(columnIndex: number) {
		if (hoverColumn) hoveredColumn = columnIndex;
	}

	function onHeaderMouseleave(columnIndex: number) {
		if (hoveredColumn === columnIndex) {
			hoveredColumn = null;
		}
	}

	function toggleSort(column: GridTableColumnDef<T>) {
		if (!column.sortable) return;

		const currentSort = getSortRule(column);
		const remainingSort = activeSort.filter((sortRule) => sortRule.key !== column.key);
		let nextSort: GridTableSort<T>;

		if (!currentSort) {
			nextSort = [{key: column.key, direction: 'asc'}, ...activeSort];
		} else if (currentSort.direction === 'asc') {
			nextSort = [{key: column.key, direction: 'desc'}, ...remainingSort];
		} else {
			nextSort = remainingSort;
		}

		sort = nextSort;
		sortChange?.(nextSort);
	}

	function onHeaderClick(column: GridTableColumnDef<T>, event: MouseEvent) {
		if (!column.sortable) return;
		if (isInteractiveTarget(event.target)) return;
		toggleSort(column);
	}

	function getStyling(styling: string | GridTableStylingFn<T> | undefined, row: T, tableData: T[], index: number): { class?: string, style?: string } {
		if (!styling) return {};
		const result = typeof styling === 'function' ? styling(row, tableData, index) : styling;
		if (typeof result === 'string') {
			return {class: result};
		}
		return result;
	}

	function mergeStyles(...styles: Array<string | undefined>) {
		return styles.filter(Boolean).join('; ') || undefined;
	}

	function openSettings(event: MouseEvent) {
		event.preventDefault();
		popupManager.open.component(TableSettings, {
			columns: columns as unknown as ColumnDef<Record<string, any>>[],
			onToggleColumn: () => undefined,
		}, {pos: event});
	}

	function openSettingsFromKeyboard(event: KeyboardEvent) {
		if (!columnsEditable) return;
		if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'ContextMenu') return;
		event.preventDefault();
		popupManager.open.component(TableSettings, {
			columns: columns as unknown as ColumnDef<Record<string, any>>[],
			onToggleColumn: () => undefined,
		}, {anchor: event.currentTarget as HTMLElement});
	}

	function onHeaderKeydown(column: GridTableColumnDef<T>, event: KeyboardEvent) {
		if (column.sortable && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			toggleSort(column);
			return;
		}

		openSettingsFromKeyboard(event);
	}

	function isInteractiveTarget(target: EventTarget | null) {
		return target instanceof HTMLElement && target.closest('button,a,input,select,textarea,label,[role="button"],[data-table-row-click-ignore]');
	}

	function onCellClick(row: T, index: number, event: MouseEvent) {
		if (!rowClick || isInteractiveTarget(event.target)) return;
		rowClick(row, data, index, event);
	}

	function onCellKeydown(row: T, index: number, event: KeyboardEvent) {
		if (!rowClick || isInteractiveTarget(event.target)) return;
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		rowClick(row, data, index, event);
	}
</script>

<div class={wrapperClass} role="table" aria-rowcount={data.length} aria-colcount={visibleColumns.length}>
	<div class={gridClass} style="grid-template-columns: {gridTemplateColumns};">
		{#if !hideHeader}
			<div role="row" class="contents">
				{#each visibleColumns as column, columnIndex}
					<div
						role="columnheader"
						aria-sort={getAriaSort(column)}
						class={twMerge(
							headerCellClass,
							getHeaderInteractionClass(column),
							fixedFirstColumn && columnIndex === 0 && fixedFirstColumnHeaderClass,
							getOverflowClass(column),
							getHeaderHoverClass(columnIndex),
							headerClasses,
							column.style?.header,
						)}
						tabindex={(columnsEditable || column.sortable) ? 0 : undefined}
						oncontextmenu={columnsEditable ? openSettings : undefined}
						onclick={(event) => onHeaderClick(column, event)}
						onkeydown={(event) => onHeaderKeydown(column, event)}
						onmouseenter={() => onHeaderMouseenter(columnIndex)}
						onmouseleave={() => onHeaderMouseleave(columnIndex)}
					>
						<span class={headerContentClass}>
							<span class="min-w-0 truncate">{column.label}</span>
							{#if column.sortable}
								{@const primarySortRule = getPrimarySortRule(column)}
								<span class={sortMarkerClass} aria-hidden="true">
									{#if primarySortRule?.direction === 'asc'}
										<ArrowDown size={13}/>
									{:else if primarySortRule?.direction === 'desc'}
										<ArrowUp size={13}/>
									{:else}
										<ArrowUpDown size={13} class="text-muted-contrast"/>
									{/if}
								</span>
							{/if}
						</span>
					</div>
				{/each}
			</div>
		{/if}

		{#each data as row, i (i)}
			{@const finalRowStyle = getStyling(rowStyle, row, data, i)}
			{@const isLastRow = i === data.length - 1}
			<div role="row" class="contents">
				{#each visibleColumns as column, columnIndex}
					{@const cellStyle = getStyling(column.style?.cell, row, data, i)}
					<div
						role="cell"
						class={twMerge(
							cellClass,
							getCellDividerClass(isLastRow),
							rowClick && 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent',
							fixedFirstColumn && columnIndex === 0 && fixedFirstColumnCellClass,
						)}
						tabindex={rowClick && columnIndex === 0 ? 0 : undefined}
						onmouseenter={() => onCellMouseenter(i, columnIndex)}
						onmouseleave={() => onCellMouseleave(i, columnIndex)}
						onclick={(event) => onCellClick(row, i, event)}
						onkeydown={(event) => onCellKeydown(row, i, event)}
					>
						<div
							class={twMerge(
								cellInnerClass,
								getAlternateRowClass(i),
								finalRowStyle.class,
								cellStyle.class,
							)}
							style={mergeStyles(finalRowStyle.style, cellStyle.style)}
						>
							<div class={twMerge(cellHoverOverlayClass, getCellHoverOverlayClass(i, columnIndex))}></div>
							<div class={twMerge(cellContentClass, getOverflowClass(column))}>
								{#if column.snippet}
									{@render column.snippet(row)}
								{:else if column.formatter}
									{column.formatter(row, data, i)}
								{:else}
									{row[column.key]}
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
