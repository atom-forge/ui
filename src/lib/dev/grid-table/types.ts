import type {Snippet} from 'svelte';

export type GridTableSizing = 'content' | 'truncate' | 'fill';
export type GridTableOverflow = 'ellipsis' | 'clip' | 'wrap';
export type GridTableDividers = boolean | 'alternate';
export type GridTableSortDirection = 'asc' | 'desc';
export type GridTableSortRule<T> = {
	key: keyof T
	direction: GridTableSortDirection
}
export type GridTableSort<T> = Array<GridTableSortRule<T>>;

export type GridTableStylingResult = string | { class?: string; style?: string };
export type GridTableStylingFn<T> = (row: T, table: Array<T>, index: number) => GridTableStylingResult;

export type GridTableCellDef<T> = {
	formatter?: (row: T, table: Array<T>, index: number) => string | number
	snippet?: never
} | {
	formatter?: never
	snippet?: Snippet<[T]>;
}

export type GridTableColumnStyling<T> = {
	header?: string
	cell?: string | GridTableStylingFn<T>
}

export type GridTableColumnDef<T> =
	& {
		key: keyof T
		label: string
		fixed?: boolean
		visible?: boolean
		sortable?: boolean
		sizing?: GridTableSizing
		overflow?: GridTableOverflow
		width?: string
		minWidth?: string
		style?: GridTableColumnStyling<T>
	}
	& GridTableCellDef<T>
