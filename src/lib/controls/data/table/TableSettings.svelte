<script lang="ts" generics="T extends Record<string, any>">
	import {Card} from "../../display/card";
	import {CheckboxView} from '../../forms/checkbox';
	import type {ColumnDef} from './types';

	let {
		columns = $bindable(),
		onToggleColumn
	}: {
		columns: ColumnDef<T>[];
		onToggleColumn: (key: keyof T) => void;
	} = $props();

	function isVisible(column: ColumnDef<T>) {
		return column.visible !== false;
	}

	function toggleColumn(column: ColumnDef<T>) {
		column.visible = !isVisible(column);
		onToggleColumn(column.key);
	}
</script>

<Card class="rounded-md shadow-lg p-1 flex flex-col w-48">
	<div class="flex flex-col">
		{#each columns as col}
			{#if !col.fixed}
				<CheckboxView
					status={isVisible(col) ? 'checked' : 'unchecked'}
					disabled={col.fixed}
					label={col.label}
					onclick={() => toggleColumn(col)}
					compact
				/>
			{/if}
		{/each}
	</div>
</Card>
