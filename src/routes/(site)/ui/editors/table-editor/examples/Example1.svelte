<script lang="ts">
	import { TableEditor, makeDefaultTableData } from '@atom-forge/ui';

	let value = $state(makeDefaultTableData());
</script>

<div class="w-full">
	<TableEditor {value} onchange={(next) => value = next} />
</div>
