<script lang="ts" generics="T extends Record<string, any>">
	import type {ClassProp} from "../../../index";
	import {getPopupManager} from '../../overlays/popup';
	import TableSettings from './TableSettings.svelte';
	import type {ColumnDef, StylingFn} from './types';
	import {untrack} from "svelte";
	import {twMerge} from "tailwind-merge";

	const popupManager = getPopupManager();

	let {
		data,
		columns: columnsParam = $bindable(),
		rowStyle,
		rowClick,
		columnsEditable = false,
		class: classes = ''
	}: ClassProp & {
		data: T[]
		columns: ColumnDef<T>[]
		rowStyle?: string | StylingFn<T>
		rowClick?: (row: T, table: T[], index: number, event: MouseEvent | KeyboardEvent) => void
		columnsEditable?: boolean
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
		'overflow-auto border border-frame rounded-surface relative max-h-full',
		classes,
	));
	const tableClass = 'w-full table-fixed text-sm text-left text-canvas-contrast';
	const headerClass = $derived(twMerge(
		'bg-secondary text-xs text-canvas-contrast uppercase',
		columnsEditable ? 'cursor-context-menu' : 'cursor-default',
	));
	const thClass = 'p-3 font-medium whitespace-nowrap overflow-hidden text-ellipsis sticky top-0 z-20 bg-secondary';
	const trClass = $derived(twMerge(
		'bg-surface border-b border-frame hover:bg-secondary/50',
		rowClick ? 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent' : ''
	));
	const tdClass = 'p-3 whitespace-nowrap overflow-hidden text-ellipsis';

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

	const visibleColumns = $derived(columns.filter((c: ColumnDef<T>) => c.visible));

</script>

<div class={wrapperClass}>
	<table class={tableClass}>
		<thead class={headerClass}
		       oncontextmenu={columnsEditable ? openSettings : undefined}>
		<tr>
			{#each visibleColumns as col}
				<th scope="col"
				    class={twMerge(thClass, col.style?.header)}
				    style={col.shrink && !col.style?.header ? 'width: 1%' : undefined}
				>
					{col.label}
				</th>
			{/each}
		</tr>
		</thead>
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
					<td class={twMerge(tdClass, cellStyle.class)} style={cellStyle.style}>
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
