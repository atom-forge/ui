<script lang="ts">
	import {Button, Card, NativeSelect} from '$lib';
	import {
		UserPlus, Mail, Phone, ArrowRight,
		Star, FileText, CircleCheck, Plus, X
	} from 'lucide-svelte';

	type ActivityType = 'added' | 'emailed' | 'called' | 'moved' | 'starred' | 'note' | 'closed';

	type Activity = {
		id: number;
		type: ActivityType;
		contact: string;
		detail: string;
		time: string;
	};

	let activities = $state<Activity[]>([
		{id: 1,  type: 'closed',  contact: 'Elena Rossi',   detail: 'Deal closed – $9,300',    time: '2m ago'},
		{id: 2,  type: 'moved',   contact: 'Tom Reed',      detail: 'Moved to Negotiation',     time: '14m ago'},
		{id: 3,  type: 'note',    contact: 'Sarah Connor',  detail: 'Added a note',             time: '32m ago'},
		{id: 4,  type: 'emailed', contact: 'David Chen',    detail: 'Sent follow-up email',     time: '1h ago'},
		{id: 5,  type: 'called',  contact: 'John Martinez', detail: 'Call – 12 min',            time: '2h ago'},
		{id: 6,  type: 'added',   contact: 'Fiona Grant',   detail: 'Contact created',          time: '3h ago'},
		{id: 7,  type: 'starred', contact: 'Laura Kim',     detail: 'Marked as starred',        time: '5h ago'},
		{id: 8,  type: 'moved',   contact: 'Andras Kovacs', detail: 'Moved to Proposal Sent',   time: 'Yesterday'},
		{id: 9,  type: 'emailed', contact: 'Maya Patel',    detail: 'Intro email sent',         time: 'Yesterday'},
		{id: 10, type: 'closed',  contact: 'Chris Walker',  detail: 'Marked as Churned',        time: '2d ago'},
	]);

	const iconMap: Record<ActivityType, any> = {
		added:   UserPlus,
		emailed: Mail,
		called:  Phone,
		moved:   ArrowRight,
		starred: Star,
		note:    FileText,
		closed:  CircleCheck,
	};

	const colorMap: Record<ActivityType, string> = {
		added:   'text-accent bg-accent/10',
		emailed: 'text-blue-400 bg-blue-400/10',
		called:  'text-green-500 bg-green-500/10',
		moved:   'text-yellow-400 bg-yellow-400/10',
		starred: 'text-yellow-400 bg-yellow-400/10',
		note:    'text-muted-contrast bg-secondary',
		closed:  'text-green-500 bg-green-500/10',
	};

	const activityLabels: Record<ActivityType, string> = {
		added:   'Contact created',
		emailed: 'Sent email',
		called:  'Phone call',
		moved:   'Moved stage',
		starred: 'Starred',
		note:    'Added note',
		closed:  'Closed deal',
	};

	const contactOptions = [
		{value: 'Sarah Connor',   label: 'Sarah Connor'},
		{value: 'John Martinez',  label: 'John Martinez'},
		{value: 'Laura Kim',      label: 'Laura Kim'},
		{value: 'Tom Reed',       label: 'Tom Reed'},
		{value: 'Andras Kovacs',  label: 'Andras Kovacs'},
		{value: 'Maya Patel',     label: 'Maya Patel'},
		{value: 'Chris Walker',   label: 'Chris Walker'},
		{value: 'Elena Rossi',    label: 'Elena Rossi'},
		{value: 'David Chen',     label: 'David Chen'},
		{value: 'Fiona Grant',    label: 'Fiona Grant'},
	];

	const typeOptions: {value: ActivityType; label: string}[] = [
		{value: 'emailed', label: 'Sent email'},
		{value: 'called',  label: 'Phone call'},
		{value: 'note',    label: 'Added note'},
		{value: 'moved',   label: 'Moved stage'},
		{value: 'closed',  label: 'Closed deal'},
		{value: 'added',   label: 'Contact created'},
		{value: 'starred', label: 'Starred'},
	];

	let showForm    = $state(false);
	let newContact  = $state('Sarah Connor');
	let newType     = $state<ActivityType>('emailed');

	function addActivity() {
		activities = [{
			id: Date.now(),
			type: newType,
			contact: newContact,
			detail: activityLabels[newType],
			time: 'just now',
		}, ...activities];
		showForm = false;
		newContact = 'Sarah Connor';
		newType = 'emailed';
	}
</script>

<Card class="p-4 flex flex-col gap-1">
	<div class="flex items-center justify-between mb-2 px-1">
		<p class="text-xs font-semibold text-muted-contrast uppercase tracking-wide">Activity Feed</p>
		<Button icon={showForm ? X : Plus} ghost micro onclick={() => showForm = !showForm}/>
	</div>

	<!-- Inline new activity form -->
	{#if showForm}
		<div class="mb-2 p-3 rounded-lg bg-secondary/60 flex flex-col gap-2 border border-frame">
			<p class="text-xs font-medium text-muted-contrast">New activity</p>
			<NativeSelect bind:value={newContact} options={contactOptions}/>
			<NativeSelect bind:value={newType} options={typeOptions}/>
			<div class="flex gap-2 justify-end">
				<Button label="Cancel" ghost micro onclick={() => showForm = false}/>
				<Button label="Add" accent micro onclick={addActivity}/>
			</div>
		</div>
	{/if}

	{#each activities as act (act.id)}
		{@const Ico = iconMap[act.type]}
		{@const color = colorMap[act.type]}
		<div class="flex items-start gap-3 py-2.5 px-1 rounded-lg hover:bg-secondary/60 transition-colors">
			<div class="shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center {color}">
				<Ico size={13}/>
			</div>
			<div class="flex-1 min-w-0">
				<div class="flex items-center justify-between gap-1">
					<span class="text-xs font-medium text-canvas-contrast truncate">{act.contact}</span>
					<span class="text-[10px] text-muted-contrast shrink-0">{act.time}</span>
				</div>
				<p class="text-xs text-muted-contrast truncate">{act.detail}</p>
			</div>
		</div>
	{/each}
</Card>
