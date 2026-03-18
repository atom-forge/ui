<script lang="ts">
	import {Avatar, Card, Chip, Button, getModalManager, getToastManager} from '$lib';
	import {ArrowRight, ArrowUp, ArrowDown, MoreHorizontal, Building, CircleDollarSign, Clock} from 'lucide-svelte';
	import SortableGroup from '$lib/gems/dnd/SortableGroup.svelte';
	import SortableList from '$lib/gems/dnd/SortableList.svelte';

	const toast = getToastManager();
	const modal = getModalManager();

	type Deal = {id: string; name: string; company: string; value: string; owner: string; days: number};
	type Stage = {id: string; label: string; color: string; deals: Deal[]};

	let stages = $state<Stage[]>([
		{
			id: 'qualify', label: 'Qualifying', color: 'bg-stone-400',
			deals: [
				{id: 'd1', name: 'Enterprise License',  company: 'Skynet Solutions', value: '$12,000', owner: 'Elvis',     days: 3},
				{id: 'd2', name: 'SaaS Subscription',   company: 'TechStart',        value: '$5,400',  owner: 'Sarah C',   days: 7},
				{id: 'd3', name: 'Consulting Package',  company: 'GreenOps',         value: '$2,800',  owner: 'Tom Reed',  days: 1},
			]
		},
		{
			id: 'propose', label: 'Proposal Sent', color: 'bg-blue-400',
			deals: [
				{id: 'd4', name: 'Annual Contract',     company: 'Acme Corp',        value: '$8,200',  owner: 'Elvis',     days: 12},
				{id: 'd5', name: 'Team License',        company: 'CodeBase Ltd',     value: '$5,500',  owner: 'Andras K',  days: 5},
			]
		},
		{
			id: 'negotiate', label: 'Negotiation', color: 'bg-yellow-400',
			deals: [
				{id: 'd6', name: 'Platform Rollout',    company: 'BuildFast Inc',    value: '$21,000', owner: 'Tom Reed',  days: 18},
				{id: 'd7', name: 'Agency Bundle',       company: 'MediaWave',        value: '$9,300',  owner: 'Sarah C',   days: 9},
			]
		},
		{
			id: 'closed', label: 'Closed Won', color: 'bg-green-400',
			deals: [
				{id: 'd8', name: 'Growth Plan',         company: 'DesignHub',        value: '$3,100',  owner: 'Elvis',     days: 24},
				{id: 'd9', name: 'Starter Pack',        company: 'GrowthLab',        value: '$1,200',  owner: 'Laura K',   days: 30},
			]
		},
	]);

	function totalValue(deals: Deal[]) {
		return deals.reduce((sum, d) => sum + parseInt(d.value.replace(/\D/g, '')), 0);
	}

	function fmt(n: number) {
		return '$' + n.toLocaleString();
	}

	function moveWithinLane(dealId: string, stageId: string, dir: 1 | -1) {
		stages = stages.map(s => {
			if (s.id !== stageId) return s;
			const deals = [...s.deals];
			const i = deals.findIndex(d => d.id === dealId);
			const j = i + dir;
			if (j < 0 || j >= deals.length) return s;
			[deals[i], deals[j]] = [deals[j], deals[i]];
			return {...s, deals};
		});
	}

	function moveDealToStage(dealId: string, fromId: string, toId: string) {
		const deal = stages.find(s => s.id === fromId)!.deals.find(d => d.id === dealId)!;
		stages = stages.map(s => {
			if (s.id === fromId) return {...s, deals: s.deals.filter(d => d.id !== dealId)};
			if (s.id === toId)   return {...s, deals: [deal, ...s.deals]};
			return s;
		});
		toast.show(`Deal moved to ${stages.find(s => s.id === toId)!.label}`, {type: 'success'});
	}
</script>

{#snippet dealMenuModal(data)}
	{@const deal = data?.deal as Deal}
	{@const stageId = data?.stageId as string}
	{@const stage = stages.find(s => s.id === stageId)}
	{@const idx = stage?.deals.findIndex(d => d.id === deal?.id) ?? -1}
	{@const canReorder = idx > 0 || idx < (stage?.deals.length ?? 0) - 1}
	<Card class="w-80 overflow-hidden p-0">
		<!-- Deal info -->
		<div class="p-4 border-b border-frame">
			<p class="text-sm font-bold text-canvas-contrast leading-snug">{deal?.name}</p>
			<div class="mt-2.5 flex flex-col gap-1.5">
				<div class="flex items-center gap-2 text-xs text-muted-contrast">
					<Building size={13} class="shrink-0"/>
					<span>{deal?.company}</span>
				</div>
				<div class="flex items-center gap-2 text-xs text-muted-contrast">
					<CircleDollarSign size={13} class="shrink-0"/>
					<span class="font-medium text-canvas-contrast">{deal?.value}</span>
				</div>
				<div class="flex items-center gap-2 text-xs text-muted-contrast">
					<Clock size={13} class="shrink-0"/>
					<span>{deal?.days} days in stage</span>
				</div>
			</div>
			<div class="flex items-center gap-2 mt-3 pt-3 border-t border-frame">
				<Avatar name={deal?.owner} small/>
				<span class="text-xs text-muted-contrast">{deal?.owner}</span>
				<div class="ml-auto flex items-center gap-1.5">
					<div class="h-2 w-2 rounded-full {stage?.color}"></div>
					<span class="text-xs text-muted-contrast">{stage?.label}</span>
				</div>
			</div>
		</div>

		<!-- Actions -->
		<div class="p-2 flex flex-col gap-0.5">
			{#if canReorder}
				<p class="text-[10px] font-semibold text-muted-contrast uppercase tracking-widest px-2 pt-1 pb-0.5">Reorder</p>
				{#if idx > 0}
					<Button ghost compact icon={ArrowUp}
						onclick={() => { moveWithinLane(deal.id, stageId, -1); modal.close(); }}>
						Move up
					</Button>
				{/if}
				{#if idx < (stage?.deals.length ?? 0) - 1}
					<Button ghost compact icon={ArrowDown}
						onclick={() => { moveWithinLane(deal.id, stageId, 1); modal.close(); }}>
						Move down
					</Button>
				{/if}
				<hr class="my-1.5 border-frame"/>
			{/if}
			<p class="text-[10px] font-semibold text-muted-contrast uppercase tracking-widest px-2 pt-1 pb-0.5">Move to stage</p>
			{#each stages.filter(s => s.id !== stageId) as s}
				<button
					class="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-canvas-contrast hover:bg-secondary transition-colors text-left"
					onclick={() => { moveDealToStage(deal.id, stageId, s.id); modal.close(); }}
				>
					<div class="h-2.5 w-2.5 rounded-full {s.color} shrink-0"></div>
					<span class="flex-1">{s.label}</span>
					<ArrowRight size={14} class="text-muted-contrast shrink-0"/>
				</button>
			{/each}
		</div>
	</Card>
{/snippet}

<SortableGroup class="flex gap-3 items-start h-full">
	{#each stages as stage (stage.id)}
		<div class="flex flex-col gap-3 flex-1 min-w-48">
			<!-- Column header -->
			<div class="flex items-center gap-2 px-1">
				<div class="h-2.5 w-2.5 rounded-full {stage.color}"></div>
				<h3 class="text-sm font-semibold text-canvas-contrast">{stage.label}</h3>
				<span class="ml-auto text-xs text-muted-contrast font-medium">{fmt(totalValue(stage.deals))}</span>
			</div>

			<SortableList
				id={stage.id}
				bind:items={stage.deals}
				class="flex flex-col gap-2 min-h-12"
			>
				{#snippet item(deal)}
					<Card class="overflow-hidden p-0 cursor-grab active:cursor-grabbing select-none hover:shadow-md transition-shadow">
						<div class="h-1 {stage.color}"></div>
						<div class="p-3 flex flex-col gap-2">
							<p class="text-xs font-semibold text-canvas-contrast leading-snug">{deal.name}</p>
							<div class="flex items-center gap-1.5 text-xs text-muted-contrast">
								<Building size={11} class="shrink-0"/>
								<span>{deal.company}</span>
							</div>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-1.5">
									<Avatar name={deal.owner} small/>
									<span class="text-xs text-muted-contrast">{deal.owner}</span>
								</div>
								<Chip>{deal.value}</Chip>
							</div>
							<div class="flex items-center justify-between border-t border-frame pt-2 -mb-1">
								<div class="flex items-center gap-1 text-muted-contrast">
									<Clock size={11}/>
									<span class="text-[10px]">{deal.days}d</span>
								</div>
								<Button icon={MoreHorizontal} ghost small
									onclick={() => modal.openSnippet(dealMenuModal, { deal, stageId: stage.id })}/>
							</div>
						</div>
					</Card>
				{/snippet}
			</SortableList>
		</div>
	{/each}
</SortableGroup>
