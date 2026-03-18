<script lang="ts">
	import {Card, FlipCard} from '$lib';
	import BarChart from '$lib/gems/diagrams/BarChart.svelte';
	import {ArrowUpRight, ArrowDownRight, Store, CircleDollarSign, Handshake, Users} from 'lucide-svelte';

	const kpis = [
		{
			label: 'Total Contacts',
			value: '1,284',
			change: '+12%',
			icon: Users,
			positive: true,
			chartData: [
				{label: 'Oct', value: 980},
				{label: 'Nov', value: 1050},
				{label: 'Dec', value: 1100},
				{label: 'Jan', value: 1180},
				{label: 'Feb', value: 1220},
				{label: 'Mar', value: 1284},
			],
			color: 'bg-accent',
		},
		{
			label: 'Active Deals',
			value: '47',
			change: '+5%',
			icon: Handshake,
			positive: true,
			chartData: [
				{label: 'Oct', value: 32},
				{label: 'Nov', value: 35},
				{label: 'Dec', value: 38},
				{label: 'Jan', value: 42},
				{label: 'Feb', value: 45},
				{label: 'Mar', value: 47},
			],
			color: 'bg-blue-400',
		},
		{
			label: 'Pipeline Value',
			value: '$284,500',
			change: '+18%',
			icon: CircleDollarSign,
			positive: true,
			chartData: [
				{label: 'Oct', value: 195000},
				{label: 'Nov', value: 210000},
				{label: 'Dec', value: 225000},
				{label: 'Jan', value: 248000},
				{label: 'Feb', value: 265000},
				{label: 'Mar', value: 284500},
			],
			color: 'bg-green-400',
		},
		{
			label: 'Closed This Month',
			value: '9',
			change: '-2',
			icon: Store,
			positive: false,
			chartData: [
				{label: 'Oct', value: 14},
				{label: 'Nov', value: 12},
				{label: 'Dec', value: 11},
				{label: 'Jan', value: 13},
				{label: 'Feb', value: 11},
				{label: 'Mar', value: 9},
			],
			color: 'bg-destructive',
		},
	];
</script>

<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
	{#each kpis as kpi}
		{@const Ico = kpi.icon}
		{@const ArrowIco = kpi.positive ? ArrowUpRight : ArrowDownRight}
		<div class="h-36">
			<FlipCard trigger="manual" class="rounded-xl">
				{#snippet front(flip)}
					<Card class="p-4 flex flex-col gap-2 h-full cursor-pointer select-none" onclick={flip}>
						<div class="flex items-center justify-between">
							<span class="text-xs text-muted-contrast font-medium">{kpi.label}</span>
							<Ico size={16} class="text-accent"/>
						</div>
						<p class="text-2xl font-bold text-canvas-contrast">{kpi.value}</p>
						<p class="text-xs flex items-center gap-1 {kpi.positive ? 'text-green-500' : 'text-error'}">
							<ArrowIco size={12}/>
							{kpi.change} vs last month
						</p>
						<p class="text-[10px] text-muted-contrast/50 mt-auto">Click for trend →</p>
					</Card>
				{/snippet}
				{#snippet back(flip)}
					<Card class="p-3 flex flex-col gap-1 h-full cursor-pointer select-none" onclick={flip}>
						<div class="flex items-center justify-between mb-1">
							<span class="text-[10px] text-muted-contrast font-medium uppercase tracking-wide">{kpi.label}</span>
							<span class="text-[10px] text-muted-contrast/60">6mo trend ↩</span>
						</div>
						<div class="flex-1 min-h-0">
							<BarChart
								data={kpi.chartData.map(d => ({label: d.label, value: d.value}))}
								series={[{name: kpi.label, color: 'var(--color-accent)'}]}
								showInfo={false}
								class="h-full"
							/>
						</div>
					</Card>
				{/snippet}
			</FlipCard>
		</div>
	{/each}
</div>
