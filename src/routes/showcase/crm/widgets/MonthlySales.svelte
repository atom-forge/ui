<script lang="ts">
	import {BarChart, Button, Card, FlipCard, Table, createRowBarChartStyle, type ColumnDef} from '$lib';
	import {Repeat} from 'lucide-svelte';

	const monthlySalesData = [
		{label: 'Jan', values: [{value: 150}, {value: 120}]},
		{label: 'Feb', values: [{value: 220}, {value: 180}]},
		{label: 'Mar', values: [{value: 180}, {value: 200}]},
		{label: 'Apr', values: [{value: 250}, {value: 210}]},
		{label: 'May', values: [{value: 190}, {value: 150}]},
		{label: 'Jun', values: [{value: 300}, {value: 280}]},
	];

	const series = [
		{name: 'Online Sales',  color: '#60a5fa'},
		{name: 'In-Store Sales', color: '#4ade80'},
	];

	type Row = {month: string; online: number; instore: number; total: number};

	const tableData: Row[] = monthlySalesData.map(d => ({
		month:   d.label,
		online:  d.values[0]?.value ?? 0,
		instore: d.values[1]?.value ?? 0,
		total:   (d.values[0]?.value ?? 0) + (d.values[1]?.value ?? 0),
	}));

	const columns: ColumnDef<Row>[] = [
		{key: 'month',   label: 'Month'},
		{key: 'online',  label: 'Online',   formatter: r => `$${r.online}`,  style: {cell: 'text-right', header: 'text-right'}},
		{key: 'instore', label: 'In-Store', formatter: r => `$${r.instore}`, style: {cell: 'text-right', header: 'text-right'}},
		{key: 'total',   label: 'Total',    formatter: r => `$${r.total}`,   style: {cell: 'font-bold text-right', header: 'text-right'}},
	];
</script>

<FlipCard trigger="manual" class="rounded-xl h-full">
	{#snippet front(flip)}
		<Card class="p-5 h-full flex flex-col">
			<div class="flex items-center justify-between mb-3">
				<div>
					<h3 class="text-sm font-semibold text-canvas-contrast">Monthly Sales</h3>
					<p class="text-xs text-muted-contrast">Online vs In-Store</p>
				</div>
				<Button icon={Repeat} ghost compact onclick={flip}/>
			</div>
			<div class="flex-1 min-h-0">
				<BarChart data={monthlySalesData} {series} variant="stacked"/>
			</div>
		</Card>
	{/snippet}
	{#snippet back(flip)}
		<Card class="p-5 h-full flex flex-col">
			<div class="flex items-center justify-between mb-3">
				<div>
					<h3 class="text-sm font-semibold text-canvas-contrast">Sales Breakdown</h3>
					<p class="text-xs text-muted-contrast">Monthly detail view</p>
				</div>
				<Button icon={Repeat} ghost compact onclick={flip}/>
			</div>
			<div class="flex-1 min-h-0 overflow-auto">
				<Table
					data={tableData}
					columns={columns}
					rowStyle={(row, data) => createRowBarChartStyle(row, data, {
						values: [
							{key: 'online',  color: '#60a5fa', opacity: 0.4},
							{key: 'instore', color: '#4ade80', opacity: 0.4},
						],
						height: '6px',
					})}
				/>
			</div>
		</Card>
	{/snippet}
</FlipCard>

