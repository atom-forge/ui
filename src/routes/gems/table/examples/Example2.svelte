<script lang="ts">
	import {Table, createRowBarChartStyle, type ColumnDef} from '$lib';

	type Product = {
		name: string;
		sales: number;
		stock: number;
	};

	const data: Product[] = Array.from({length: 20}, (_, i) => ({
		name: `Product ${i + 1}`,
		sales: Math.floor(Math.random() * 500) + 50,
		stock: Math.floor(Math.random() * 1000) + 100,
	}));

	const columns: ColumnDef<Product>[] = [
		{key: 'name', label: 'Product', grow: true},
		{key: 'sales', label: 'Sales', style: {cell: 'text-right'}},
		{key: 'stock', label: 'Stock', style: {cell: 'text-right'}},
	];
</script>

<div class="h-[32rem] w-full">
	<Table {data} {columns}
	       rowStyle={(row, tableData) => createRowBarChartStyle(row, tableData, {
			   values: [
				   {key: 'sales', color: 'var(--color-accent)', opacity: 0.5},
				   {key: 'stock', color: 'var(--color-secondary)', opacity: 0.5}
			   ],
			   height: '4px'
		   })}
	/>
</div>
