<script lang="ts">
	import { TableEditor, TablePreview, type TableData } from '@atom-forge/ui';

	let data = $state<TableData>({
		headingRow: true, headingCol: false, sumRow: true, sumCol: false,
		colStyles: [
			{ align: 'left', prefix: '', postfix: '', sumDecorator: false },
			{ align: 'right', prefix: '$', postfix: '', sumDecorator: true },
		],
		rows: [['Department', 'Budget'], ['Engineering', '120000'], ['Design', '45000'], ['Total', '165000']],
	});
</script>

<div class="w-full space-y-6">
	<section class="space-y-2">
		<h3 class="text-sm font-semibold text-canvas-contrast">Edit the source</h3>
		<TableEditor value={data} onchange={(next) => data = next} />
	</section>
	<section class="space-y-2">
		<h3 class="text-sm font-semibold text-canvas-contrast">Read-only preview</h3>
		<TablePreview {data} />
	</section>
</div>
