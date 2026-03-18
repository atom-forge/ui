<script lang="ts">
	import {Avatar, Card, Chip, DatePicker, Icon, TreeView, defineIcon, type TreeNode} from "$lib";
	import {Briefcase, Building, Lightbulb, Calendar, Users, UserCheck} from "lucide-svelte";

	type Member = {
		name: string;
		role: string;
		dept: string;
		startDate: Date;
	};

	const members: Record<string, Member> = {
		alice: {name: 'Alice Chen',    role: 'Senior Frontend Dev', dept: 'Engineering', startDate: new Date(2021, 3, 12)},
		bob:   {name: 'Bob Kim',       role: 'Frontend Developer',  dept: 'Engineering', startDate: new Date(2023, 7, 1)},
		carol: {name: 'Carol Johnson', role: 'Backend Lead',        dept: 'Engineering', startDate: new Date(2020, 1, 3)},
		david: {name: 'David Park',    role: 'Backend Developer',   dept: 'Engineering', startDate: new Date(2022, 10, 7)},
		eva:   {name: 'Eva Martinez',  role: 'Lead Designer',       dept: 'Design',      startDate: new Date(2021, 8, 14)},
		frank: {name: 'Frank Liu',     role: 'UI Designer',         dept: 'Design',      startDate: new Date(2024, 1, 5)},
		grace: {name: 'Grace Wilson',  role: 'Marketing Manager',   dept: 'Marketing',   startDate: new Date(2019, 5, 20)},
		henry: {name: 'Henry Brown',   role: 'Marketing Analyst',   dept: 'Marketing',   startDate: new Date(2023, 2, 15)},
	};

	// Mutable per-member dates
	let memberDates = $state<Record<string, {reviewDate: Date | null; nextOneOnOne: Date | null}>>({
		alice: {reviewDate: new Date(2026, 5, 15),  nextOneOnOne: null},
		bob:   {reviewDate: new Date(2026, 4, 20),  nextOneOnOne: null},
		carol: {reviewDate: new Date(2026, 2, 30),  nextOneOnOne: new Date(2026, 2, 18)},
		david: {reviewDate: new Date(2026, 6, 10),  nextOneOnOne: null},
		eva:   {reviewDate: new Date(2026, 3, 22),  nextOneOnOne: new Date(2026, 2, 12)},
		frank: {reviewDate: new Date(2026, 5, 1),   nextOneOnOne: null},
		grace: {reviewDate: new Date(2026, 7, 15),  nextOneOnOne: null},
		henry: {reviewDate: new Date(2026, 6, 28),  nextOneOnOne: null},
	});

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	function isReviewSoon(id: string): boolean {
		const d = memberDates[id]?.reviewDate;
		if (!d) return false;
		const diff = d.getTime() - today.getTime();
		return diff >= 0 && diff < 45 * 24 * 60 * 60 * 1000;
	}

	let selectedId = $state<string | undefined>(undefined);
	const selectedMember   = $derived(selectedId ? members[selectedId]      : null);
	const selectedDates    = $derived(selectedId ? memberDates[selectedId]  : null);

	const tree: TreeNode[] = [
		{
			id: 'eng', label: 'Engineering', icon: defineIcon(Briefcase),
			children: [
				{id: 'fe', label: 'Frontend', icon: defineIcon(Building), children: [
					{id: 'alice', label: 'Alice Chen',    type: 'member'},
					{id: 'bob',   label: 'Bob Kim',       type: 'member'},
				]},
				{id: 'be', label: 'Backend', icon: defineIcon(Building), children: [
					{id: 'carol', label: 'Carol Johnson', type: 'member'},
					{id: 'david', label: 'David Park',    type: 'member'},
				]},
			],
		},
		{
			id: 'design', label: 'Design', icon: defineIcon(Lightbulb),
			children: [
				{id: 'eva',   label: 'Eva Martinez', type: 'member'},
				{id: 'frank', label: 'Frank Liu',    type: 'member'},
			],
		},
		{
			id: 'mkt', label: 'Marketing', icon: defineIcon(Users),
			children: [
				{id: 'grace', label: 'Grace Wilson', type: 'member'},
				{id: 'henry', label: 'Henry Brown',  type: 'member'},
			],
		},
	];

	const totalMembers = Object.keys(members).length;
	const reviewSoonCount = $derived(Object.keys(members).filter(isReviewSoon).length);
</script>

<Card>
	<!-- Header -->
	<div class="flex flex-wrap items-center justify-between gap-2 px-6 py-4 border-b border-frame">
		<div>
			<h3 class="text-base font-semibold text-canvas-contrast">Team Structure</h3>
			<p class="text-xs text-muted-contrast">{totalMembers} members · 3 departments</p>
		</div>
		<div class="flex items-center gap-2">
			{#if reviewSoonCount > 0}
				<Chip color="yellow">{reviewSoonCount} review{reviewSoonCount > 1 ? 's' : ''} due</Chip>
			{/if}
			<Chip color="blue">Q2 2026</Chip>
		</div>
	</div>

	<div class="flex flex-col md:flex-row min-h-80">
		<!-- Left: Tree -->
		<div class="w-full md:w-72 md:shrink-0 border-b md:border-b-0 md:border-r border-frame p-3 overflow-y-auto">
			<TreeView
				data={tree}
				{selectedId}
				onNodeClick={(node) => { if (node.type === 'member') selectedId = node.id ?? undefined; }}
			>
				{#snippet row(node)}
					{#if node.type === 'member'}
						{@const m = members[node.id!]}
						<div class="flex items-center gap-2 w-full min-w-0 py-0.5">
							<Avatar name={m.name} small/>
							<div class="min-w-0 flex-1">
								<div class="text-sm text-canvas-contrast truncate leading-tight">{m.name}</div>
								<div class="text-xs text-muted-contrast truncate leading-tight">{m.role}</div>
							</div>
							{#if isReviewSoon(node.id!)}
								<div class="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" title="Review due soon"></div>
							{/if}
						</div>
					{:else}
						<div class="flex items-center gap-2 py-0.5">
							{#if node.icon}
								<Icon icon={node.icon} size="4" class="text-muted-contrast shrink-0"/>
							{/if}
							<span class="text-sm font-medium text-canvas-contrast">{node.label}</span>
						</div>
					{/if}
				{/snippet}
			</TreeView>
		</div>

		<!-- Right: Detail panel -->
		<div class="flex-1 p-6">
			{#if selectedMember && selectedDates && selectedId}
				{@const m = selectedMember}
				<div class="space-y-5 max-w-sm">
					<!-- Avatar + info -->
					<div class="flex items-center gap-4">
						<Avatar name={m.name} class="h-12 w-12 text-base"/>
						<div>
							<h4 class="text-base font-semibold text-canvas-contrast">{m.name}</h4>
							<p class="text-sm text-muted-contrast">{m.role}</p>
							<p class="text-xs text-muted-contrast">
								Started {m.startDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
							</p>
						</div>
					</div>

					<div class="space-y-3">
						<div class="space-y-1">
							<label class="text-xs font-semibold text-muted-contrast uppercase tracking-wider flex items-center gap-1.5">
								<Calendar size={12}/>
								Performance Review
							</label>
							<DatePicker bind:value={memberDates[selectedId].reviewDate} compact clearable/>
							{#if selectedDates.reviewDate && isReviewSoon(selectedId)}
								<p class="text-xs text-orange-500">Due within 45 days</p>
							{/if}
						</div>

						<div class="space-y-1">
							<label class="text-xs font-semibold text-muted-contrast uppercase tracking-wider flex items-center gap-1.5">
								<Calendar size={12}/>
								Next 1:1
							</label>
							<DatePicker bind:value={memberDates[selectedId].nextOneOnOne} compact clearable placeholder="Not scheduled"/>
						</div>
					</div>
				</div>
			{:else}
				<div class="h-full flex flex-col items-center justify-center gap-2 text-muted-contrast">
					<UserCheck size={32} class="opacity-30"/>
					<p class="text-sm">Select a team member</p>
				</div>
			{/if}
		</div>
	</div>
</Card>
