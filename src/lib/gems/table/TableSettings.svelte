<script lang="ts" generics="T extends Record<string, any>">
	import {Card} from "$lib/gems/card";
	import {CheckboxView} from '$lib/gems/checkbox';
	import type {ColumnDef} from '$lib/gems/table/types';

	let {
		columns = $bindable(),
		onToggleColumn
	}: {
		columns: ColumnDef<T>[];
		onToggleColumn: (key: keyof T) => void;
	} = $props();

</script>

<Card class="rounded-md shadow-lg p-1 flex flex-col w-48">
	<div class="flex flex-col">
		{#each columns as col}
			{#if !col.fixed}
				<CheckboxView
					status={col.visible ? 'checked' : 'unchecked'}
					disabled={col.fixed}
					label={col.label}
					onclick={() => col.visible = !col.visible}
					compact
				/>
			{/if}
		{/each}
	</div>
</Card>
