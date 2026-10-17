<script lang="ts">
	import { TableEditor, makeDefaultTableData, type TableData } from '@atom-forge/ui';

	let value = $state(makeDefaultTableData());

	function onchange(v: TableData) {
		value = v;
	}
</script>

<div class="w-full space-y-3">
	<TableEditor {value} {onchange} />
	<details class="text-xs">
		<summary class="text-muted-contrast cursor-pointer select-none">data state</summary>
		<pre class="mt-2 p-3 bg-surface rounded border border-frame overflow-auto text-canvas-contrast">{JSON.stringify(value, null, 2)}</pre>
	</details>
</div>
