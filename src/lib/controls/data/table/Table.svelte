<script lang="ts" generics="T extends Record<string, any>">
	import type {ClassProp} from "../../../index";
	import {getPopupManager} from '../../overlays/popup';
	import TableSettings from './TableSettings.svelte';
	import type {ColumnDef, StylingFn, TableOverflow} from './types';
	import {untrack} from "svelte";
	import {twMerge} from "tailwind-merge";

	const popupManager = getPopupManager();

	let {
		data,
		columns: columnsParam = $bindable(),
		rowStyle,
		rowClick,
		columnsEditable = false,
		frameless = false,
		hideHeader = false,
		noScroll = false,
		layout = 'fixed',
		overflow = 'ellipsis',
		headerClass: headerClasses = '',
		class: classes = ''
	}: ClassProp & {
		data: T[]
		columns: ColumnDef<T>[]
		rowStyle?: string | StylingFn<T>
		rowClick?: (row: T, table: T[], index: number, event: MouseEvent | KeyboardEvent) => void
		columnsEditable?: boolean
		frameless?: boolean
		hideHeader?: boolean
		noScroll?: boolean
		layout?: 'fixed' | 'auto'
		overflow?: TableOverflow
		headerClass?: string
	} = $props();

	let columns = $state(columnsParam);
	untrack(() =>
		columns.forEach((column: ColumnDef<T>) => {
			if (column.visible === undefined) {
				column.visible = true;
			}
		})
	)

	const wrapperClass = $derived(twMerge(
		'relative max-h-full',
		noScroll ? 'overflow-x-hidden overflow-y-auto' : 'overflow-auto',
		!frameless && 'border border-frame rounded-surface',
		classes,
	));
	const tableClass = $derived(twMerge(
		'w-full text-sm text-left text-canvas-contrast',
		!noScroll && layout === 'auto' ? 'table-auto' : 'table-fixed',
	));
	const theadClass = $derived(twMerge(
		'bg-secondary text-xs text-canvas-contrast uppercase',
		columnsEditable ? 'cursor-context-menu' : 'cursor-default',
	));
	const thClass = 'p-3 font-medium sticky top-0 z-20 bg-secondary';
	const trClass = $derived(twMerge(
		'bg-surface hover:bg-secondary/50',
		!frameless && 'border-b border-frame',
		rowClick ? 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent' : ''
	));
	const tdClass = 'p-3';

	function toggleColumnVisibility(key: string) {
		columns = columns.map((c: ColumnDef<T>) => {
			if (c.key === key) {
				return {...c, visible: !c.visible};
			}
			return c;
		});
	}

	function openSettings(event: MouseEvent) {
		event.preventDefault();
		popupManager.open.component(TableSettings, {
			columns: columns as ColumnDef<Record<string, any>>[],
			onToggleColumn: toggleColumnVisibility
		}, {pos: event});
	}

	function getStyling(styling: string | StylingFn<T> | undefined, row: T, tableData: T[], index: number): { class?: string, style?: string } {
		if (!styling) return {};
		const result = typeof styling === 'function' ? styling(row, tableData, index) : styling;
		if (typeof result === 'string') {
			return {class: result};
		}
		return result;
	}

	function getOverflowClass(value: TableOverflow | undefined) {
		switch (value ?? overflow) {
			case 'wrap':
				return 'whitespace-normal break-words overflow-visible';
			case 'clip':
				return 'whitespace-nowrap overflow-hidden text-clip';
			case 'ellipsis':
			default:
				return 'whitespace-nowrap overflow-hidden text-ellipsis';
		}
	}

	function getColumnOverflowClass(column: ColumnDef<T>) {
		if (noScroll && column.fixed) {
			return 'whitespace-nowrap overflow-visible text-clip';
		}
		return getOverflowClass(column.overflow);
	}

	function parseSizingWeight(value: string | undefined) {
		if (!value) return undefined;
		const match = value.trim().match(/^([\d.]+)\s*(px|rem|em|ch|%)?$/);
		if (!match) return undefined;
		const amount = Number(match[1]);
		const unit = match[2] ?? 'px';
		if (!Number.isFinite(amount) || amount <= 0) return undefined;
		if (unit === 'rem' || unit === 'em') return amount * 16;
		if (unit === 'ch') return amount * 8;
		return amount;
	}

	function getColumnWeight(column: ColumnDef<T>) {
		const baseWeight = parseSizingWeight(column.width)
			?? parseSizingWeight(column.minWidth)
			?? (column.shrink ? 48 : undefined)
			?? (column.grow ? 160 : undefined)
			?? 120;
		if (!noScroll) return baseWeight;
		if (column.fixed) return baseWeight * 3;
		return baseWeight;
	}

	const visibleColumns = $derived(columns.filter((c: ColumnDef<T>) => c.visible));

	const totalColumnWeight = $derived(
		visibleColumns.reduce((sum: number, column: ColumnDef<T>) => sum + getColumnWeight(column), 0)
	);

	function getColumnSizingStyle(column: ColumnDef<T>) {
		if (noScroll) {
			const weight = getColumnWeight(column);
			const width = totalColumnWeight > 0 ? weight / totalColumnWeight * 100 : 100 / Math.max(visibleColumns.length, 1);
			return `width: ${width}%`;
		}

		const rules: string[] = [];
		if (column.width) rules.push(`width: ${column.width}`);
		else if (column.shrink) rules.push('width: 1%');
		if (column.minWidth) rules.push(`min-width: ${column.minWidth}`);
		if (column.maxWidth) rules.push(`max-width: ${column.maxWidth}`);
		return rules.length ? rules.join('; ') : undefined;
	}

	function mergeStyles(...styles: Array<string | undefined>) {
		return styles.filter(Boolean).join('; ') || undefined;
	}

	function isInteractiveTarget(target: EventTarget | null) {
		return target instanceof HTMLElement && target.closest('button,a,input,select,textarea,label,[role="button"],[data-table-row-click-ignore]');
	}

	function onRowClick(row: T, index: number, event: MouseEvent) {
		if (!rowClick || isInteractiveTarget(event.target)) return;
		rowClick(row, data, index, event);
	}

	function onRowKeydown(row: T, index: number, event: KeyboardEvent) {
		if (!rowClick || isInteractiveTarget(event.target)) return;
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		rowClick(row, data, index, event);
	}

</script>

<div class={wrapperClass}>
	<table class={tableClass}>
		<colgroup>
			{#each visibleColumns as col}
				<col style={getColumnSizingStyle(col)}/>
			{/each}
		</colgroup>
		{#if !hideHeader}
			<thead class={theadClass}
			       oncontextmenu={columnsEditable ? openSettings : undefined}>
			<tr>
				{#each visibleColumns as col}
					<th scope="col"
					    class={twMerge(thClass, getColumnOverflowClass(col), headerClasses, col.style?.header)}
					    style={getColumnSizingStyle(col)}
					>
						{col.label}
					</th>
				{/each}
			</tr>
			</thead>
		{/if}
		<tbody>
		{#each data as row, i (i)}
			{@const finalRowStyle = getStyling(rowStyle, row, data, i)}
			<tr
				class={twMerge(trClass, finalRowStyle.class)}
				style={finalRowStyle.style}
				tabindex={rowClick ? 0 : undefined}
				onclick={(event) => onRowClick(row, i, event)}
				onkeydown={(event) => onRowKeydown(row, i, event)}
			>
				{#each visibleColumns as col}
					{@const cellStyle = getStyling(col.style?.cell, row, data, i)}
					<td
						class={twMerge(tdClass, getColumnOverflowClass(col), cellStyle.class)}
						style={mergeStyles(getColumnSizingStyle(col), cellStyle.style)}
					>
						{#if col.snippet}
							{@render col.snippet(row)}
						{:else if col.formatter}
							{col.formatter(row, data, i)}
						{:else}
							{row[col.key]}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
		</tbody>
	</table>
</div>
