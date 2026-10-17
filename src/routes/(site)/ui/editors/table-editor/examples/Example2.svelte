<script lang="ts">
	import { TableEditor, type TableData } from '@atom-forge/ui';

	let value:TableData = $state({
		headingRow: true,
		headingCol: false,
		sumRow: true,
		sumCol: false,
		colStyles: [
			{ align: 'left',   prefix: '',  postfix: '', sumDecorator:false },
			{ align: 'right',  prefix: '$', postfix: '', sumDecorator:false },
			{ align: 'right',  prefix: '$', postfix: '', sumDecorator:false },
			{ align: 'right',  prefix: '$', postfix: '', sumDecorator:false },
		],
		rows: [
			['Product',  'Jan',    'Feb',    'Mar'   ],
			['Widget A', '1 200',  '1 450',  '1 380' ],
			['Widget B', '850',    '920',    '1 010' ],
			['Widget C', '2 100',  '1 980',  '2 240' ],
			['Total',    '4 150',  '4 350',  '4 630' ],
		],
	});
</script>

<div class="w-full">
	<TableEditor {value} onchange={(next) => value = next} />
</div>
