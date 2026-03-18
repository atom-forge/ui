<script lang="ts">
	import {Avatar, Button, Card, EmptyState, Input, PaginationSlider, Tooltip, defineIcon, getDrawerManager, getToastManager} from "$lib";
	import {
		Archive, ArrowLeft, Inbox, Paperclip, RefreshCw,
		Search, Send, Settings, Star, Trash
	} from "lucide-svelte";
	import SettingsDrawer from './SettingsDrawer.svelte';

	const toast = getToastManager();
	const drawer = getDrawerManager();

	function openSettings() {
		drawer.open(SettingsDrawer, {}, {position: 'right', size: 'lg'});
	}

	type Label = { text: string; color: string };
	type Email = {
		id: number;
		from: string;
		subject: string;
		preview: string;
		time: string;
		read: boolean;
		starred: boolean;
		labels: Label[];
		body: string;
	};

	const allFolders = [
		{id: 'inbox', label: 'Inbox', icon: Inbox, count: 4},
		{id: 'sent', label: 'Sent', icon: Send, count: 0},
		{id: 'starred', label: 'Starred', icon: Star, count: 2},
		{id: 'archive', label: 'Archive', icon: Archive, count: 0},
		{id: 'trash', label: 'Trash', icon: Trash, count: 0},
	];

	const emails: Email[] = [
		{
			id: 1, from: 'Sarah Connor',
			subject: 'Q4 Budget Review', preview: 'Hi, I\'ve prepared the Q4 budget analysis. Please review before the board meeting on Friday.',
			time: '09:14', read: false, starred: true,
			labels: [{text: 'Finance', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'}],
			body: `Hi Elvis,\n\nI've prepared the Q4 budget analysis and attached the full report as a PDF. The key highlights are:\n\n• Revenue is up 18% YoY\n• Operating costs decreased by 6%\n• Net margin improved to 24%\n\nPlease review before the board meeting on Friday at 2pm. Let me know if you need any clarification.\n\nBest,\nSarah`
		},
		{
			id: 2, from: 'John Martinez',
			subject: 'New Enterprise client onboarded', preview: 'Great news — Acme Corp has completed onboarding. First invoice has been sent.',
			time: '08:42', read: false, starred: false,
			labels: [{text: 'Sales', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'}],
			body: `Hi team,\n\nGreat news! Acme Corp has successfully completed onboarding as our newest Enterprise client. The setup call went smoothly and their team is already using the platform.\n\nFirst invoice has been sent. Expected ARR: $120k.\n\nLet's make sure we check in with them after the first week.\n\nCheers,\nJohn`
		},
		{
			id: 3, from: 'Andras Kovacs',
			subject: 'Support ticket #902 — resolved', preview: 'The authentication issue reported by GlobalTech has been fixed and deployed.',
			time: 'Yesterday', read: true, starred: false,
			labels: [{text: 'Support', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'}],
			body: `Hi Elvis,\n\nJust a quick update — support ticket #902 from GlobalTech has been resolved. The root cause was a session token expiry edge case that only appeared on Safari iOS.\n\nFix has been deployed to production at 16:45 yesterday. No further reports from the client.\n\nTicket closed.\n\nAndras`
		},
		{
			id: 4, from: 'Laura Kim',
			subject: 'Product v2.1 release notes', preview: 'Changelog and release announcement ready for review. Launch is scheduled for Monday.',
			time: 'Yesterday', read: true, starred: true,
			labels: [
				{text: 'Product', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'},
				{text: 'Urgent', color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}
			],
			body: `Hi,\n\nThe release notes and announcement copy for v2.1 are ready for your review. Here's a summary of what's included:\n\n🆕 New: Dark mode improvements\n🆕 New: CSV export for all tables\n⚡ Improved: 40% faster initial load\n🐛 Fixed: Color picker on Firefox\n\nLaunch is scheduled for Monday 9am. Please approve the copy by Sunday EOD.\n\nThanks,\nLaura`
		},
		{
			id: 5, from: 'Tom Reed',
			subject: 'Team offsite planning', preview: 'I\'ve shortlisted 3 venues for the Q1 team offsite. Dates are tentatively set for Feb 12-14.',
			time: 'Mon', read: true, starred: false,
			labels: [{text: 'Internal', color: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'}],
			body: `Hey Elvis,\n\nI've shortlisted 3 venues for the Q1 team offsite. Dates are tentatively set for Feb 12-14.\n\nOptions:\n1. Mountain Lodge, Mátrafüred — great for team activities, 2h drive\n2. City Hotel, Budapest — easiest logistics, central location\n3. Vineyard Estate, Eger — more relaxed, beautiful setting\n\nWould love your input on which direction to go. I'll send a quick poll to the team once we narrow it down.\n\nTom`
		},
		{
			id: 6, from: 'Andras Kovacs',
			subject: 'Infrastructure cost review — Q4', preview: 'Cloud spend went up 12% this quarter. I\'ve broken down the main drivers.',
			time: 'Mon', read: true, starred: false,
			labels: [{text: 'IT', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'}],
			body: `Hi Elvis,\n\nQ4 cloud infrastructure costs increased by 12% vs Q3. Main drivers:\n\n• New staging environment for the EU region (+€340/mo)\n• Search index storage growth (+€120/mo)\n• CDN bandwidth spike in December (+€80/mo)\n\nI've flagged 2 idle instances we can shut down to save ~€180/mo. Will action unless you object.\n\nAndras`
		},
		{
			id: 7, from: 'Sarah Connor',
			subject: 'Hiring plan for H1 2026', preview: 'We have budget approval for 4 new hires. Here\'s the draft JD timeline.',
			time: 'Sun', read: true, starred: false,
			labels: [{text: 'HR', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300'}],
			body: `Hi Elvis,\n\nGood news — finance approved the 4-head hiring plan for H1 2026.\n\nProposed timeline:\n• Feb: Post Backend Engineer & Product Designer\n• Mar: Interviews\n• Apr: Offers out\n• May: Frontend Engineer & QA (pending Q1 close)\n\nCan you review the job descriptions I've drafted and send feedback by Wednesday?\n\nSarah`
		},
		{
			id: 8, from: 'Laura Kim',
			subject: 'User research synthesis — navigation', preview: 'I\'ve compiled the usability study results. Key finding: 60% of users miss the sidebar toggle.',
			time: 'Sat', read: true, starred: true,
			labels: [{text: 'Product', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'}],
			body: `Hi team,\n\nResults from the 12-user navigation study are in. Top findings:\n\n1. 60% of users don't notice the sidebar collapse button\n2. Breadcrumb confusion on nested settings pages\n3. Mobile: bottom nav preferred over hamburger menu\n\nI'll present full synthesis on Thursday. Deck is in Notion.\n\nLaura`
		},
		{
			id: 9, from: 'John Martinez',
			subject: 'GlobalTech renewal — heads up', preview: 'Their contract is up for renewal in 45 days. Suggest we schedule a QBR this week.',
			time: 'Fri', read: true, starred: false,
			labels: [{text: 'Sales', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'}],
			body: `Hi Elvis,\n\nJust flagging that GlobalTech's annual contract expires on March 15 — 45 days away. They've been a solid customer (zero tickets since September) so renewal should be smooth.\n\nRecommend we schedule a QBR this week to check in, show Q4 metrics, and introduce the 2026 roadmap. Happy to run it if you can join for the first 15 minutes.\n\nJohn`
		},
		{
			id: 10, from: 'Tom Reed',
			subject: 'Office HVAC — scheduled maintenance', preview: 'Building management has scheduled a maintenance window on Friday 13:00–15:00.',
			time: 'Fri', read: true, starred: false,
			labels: [{text: 'Internal', color: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'}],
			body: `Hi all,\n\nBuilding management has scheduled HVAC maintenance for this Friday, Feb 7, between 13:00 and 15:00. The office will be warmer than usual — might be a good time to go remote or work from the café on level 2.\n\nI'll send a reminder Thursday morning.\n\nTom`
		},
		{
			id: 11, from: 'Andras Kovacs',
			subject: 'Dependency audit complete', preview: '3 outdated packages flagged with known CVEs. Patches are ready.',
			time: 'Thu', read: true, starred: false,
			labels: [{text: 'IT', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'}],
			body: `Hi Elvis,\n\nCompleted the quarterly dependency audit. Summary:\n\n• 3 packages have known CVEs (severity: medium)\n  - lodash 4.17.19 → update to 4.17.21\n  - axios 0.21.1 → update to 1.6.0\n  - express 4.17.1 → update to 4.18.2\n• 12 packages are 2+ major versions behind (non-critical)\n\nPatches are in PR #84. Can you review and merge by Friday?\n\nAndras`
		},
		{
			id: 12, from: 'Laura Kim',
			subject: 'AtomForge landing page copy', preview: 'First draft of the new landing page is ready. Would love your feedback on the hero section.',
			time: 'Wed', read: true, starred: false,
			labels: [{text: 'Product', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'}],
			body: `Hi,\n\nFirst draft of the new AtomForge landing page is live in staging: https://staging.atomforge.dev\n\nI'm especially uncertain about the hero headline — currently "Build fast. Ship clean." — open to alternatives.\n\nPlease leave comments directly in Figma if you have time. Deadline for final copy is next Tuesday.\n\nLaura`
		},
	];

	let folder = $state('inbox');
	let search = $state('');
	let selectedId = $state<number | null>(1);
	let emailStates = $state<Record<number, {read: boolean; starred: boolean}>>(
		Object.fromEntries(emails.map(e => [e.id, {read: e.read, starred: e.starred}]))
	);

	const filtered = $derived(
		emails.filter(e =>
			(folder === 'starred' ? emailStates[e.id].starred : true) &&
			(search ? e.subject.toLowerCase().includes(search.toLowerCase()) || e.from.toLowerCase().includes(search.toLowerCase()) : true)
		)
	);

	const perPage = 4;
	let emailPage = $state(1);
	const pagedEmails = $derived(filtered.slice((emailPage - 1) * perPage, emailPage * perPage));

	$effect(() => { folder; search; emailPage = 1; });

	const selected = $derived(emails.find(e => e.id === selectedId) ?? null);

	function selectEmail(id: number) {
		selectedId = id;
		emailStates[id] = {...emailStates[id], read: true};
	}

	function toggleStar(id: number) {
		emailStates[id] = {...emailStates[id], starred: !emailStates[id].starred};
	}

	function archiveSelected() {
		if (!selected) return;
		toast.show(`"${selected.subject}" archived`, {type: 'success'});
		selectedId = null;
	}

	function deleteSelected() {
		if (!selected) return;
		toast.show(`"${selected.subject}" moved to trash`, {type: 'error'});
		selectedId = null;
	}
</script>

<!-- Full-height 3-panel layout — override the max-w-5xl from layout -->
<Card class="h-full flex flex-col lg:flex-row bg-surface overflow-hidden">

	<!-- Left pane: folder nav + email list (hidden on mobile when email is open) -->
	<div class="flex flex-col lg:flex-row lg:shrink-0 {selectedId !== null ? 'hidden lg:flex' : 'flex grow lg:grow-0'} min-h-0">

		<!-- Folder sidebar: horizontal scrollable strip on mobile, vertical on desktop -->
		<div class="shrink-0 border-b lg:border-b-0 lg:border-r border-frame bg-surface
					flex lg:flex-col lg:w-48 py-2 lg:py-3 px-2 gap-0.5 overflow-x-auto">
			<p class="text-xs font-semibold text-muted-contrast uppercase tracking-wider px-3 mb-2 hidden lg:block">Mailbox</p>
			{#each allFolders as f}
				<button
					onclick={() => { folder = f.id; selectedId = null; }}
					class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors shrink-0 lg:w-full text-left
						{folder === f.id ? 'bg-accent text-accent-contrast font-medium' : 'text-canvas-contrast hover:bg-secondary'}"
				>
					<f.icon size={16}/>
					<span class="grow">{f.label}</span>
					{#if f.count > 0}
						<span class="text-xs font-bold {folder === f.id ? 'text-accent-contrast' : 'text-muted-contrast'}">{f.count}</span>
					{/if}
				</button>
			{/each}
			<!-- Settings: desktop sidebar only -->
			<div class="mt-auto pt-2 border-t border-frame hidden lg:block">
				<button
					onclick={openSettings}
					class="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors w-full text-left text-canvas-contrast hover:bg-secondary"
				>
					<Settings size={16}/>
					<span>Settings</span>
				</button>
			</div>
		</div>

		<!-- Email list -->
		<div class="lg:w-72 shrink-0 lg:border-r border-frame bg-surface flex flex-col min-h-0 grow lg:grow-0">
			<div class="p-3 border-b border-frame flex items-center gap-2 shrink-0">
				<Input bind:value={search} placeholder="Search..." leadingIcon={Search} compact class="flex-1"/>
				<Button icon={RefreshCw} ghost compact onclick={() => toast.show('Refreshed')}/>
				<Button icon={Settings} ghost compact class="lg:hidden" onclick={openSettings}/>
			</div>
			<div class="overflow-y-auto grow">
				{#if filtered.length === 0}
					<p class="text-center text-sm text-muted-contrast py-12">No messages</p>
				{:else}
					{#each pagedEmails as email (email.id)}
						{@const state = emailStates[email.id]}
						<button
							onclick={() => selectEmail(email.id)}
							class="w-full text-left px-4 py-3 border-b border-frame transition-colors hover:bg-secondary
								{selectedId === email.id ? 'bg-secondary' : ''}
								{!state.read ? 'bg-accent-m/20' : ''}"
						>
							<div class="flex items-center gap-2 mb-1">
								<Avatar name={email.from} small/>
								<span class="text-sm font-medium text-canvas-contrast truncate grow {!state.read ? 'font-semibold' : ''}">{email.from}</span>
								<span class="text-xs text-muted-contrast shrink-0">{email.time}</span>
							</div>
							<p class="text-xs font-medium text-canvas-contrast truncate {!state.read ? '' : 'opacity-70'}">{email.subject}</p>
							<p class="text-xs text-muted-contrast truncate mt-0.5">{email.preview}</p>
							{#if email.labels.length > 0}
								<div class="flex gap-1 mt-1.5 flex-wrap">
									{#each email.labels as label}
										<span class="text-[10px] px-1.5 py-0.5 rounded-full font-medium {label.color}">{label.text}</span>
									{/each}
								</div>
							{/if}
						</button>
					{/each}
				{/if}
			</div>
			{#if filtered.length > perPage}
				<div class="px-3 py-2 border-t border-frame shrink-0">
					<PaginationSlider bind:page={emailPage} total={filtered.length} pageSize={perPage} compact/>
				</div>
			{/if}
		</div>
	</div>

	<!-- Message detail (hidden on mobile when no email selected) -->
	<div class="{selectedId !== null ? 'flex' : 'hidden lg:flex'} grow flex-col bg-surface overflow-hidden min-h-0">
		{#if selected}
			<!-- Toolbar -->
			<div class="flex items-center gap-1 px-4 py-2.5 border-b border-frame shrink-0">
				<Button icon={ArrowLeft} ghost compact onclick={() => selectedId = null}/>
				<div class="w-px h-5 bg-frame mx-1"></div>
				<Tooltip label="Archive">
					<Button icon={Archive} ghost compact onclick={archiveSelected}/>
				</Tooltip>
				<Tooltip label="Delete">
					<Button icon={Trash} ghost compact onclick={deleteSelected}/>
				</Tooltip>
				<Tooltip label={emailStates[selected.id].starred ? 'Unstar' : 'Star'}>
					<Button
						icon={Star}
						ghost compact
						class={emailStates[selected.id].starred ? 'text-yellow-500 fill-current' : ''}
						onclick={() => toggleStar(selected.id)}
					/>
				</Tooltip>
				<div class="grow"></div>
				<span class="text-xs text-muted-contrast">{selected.time}</span>
			</div>

			<!-- Content -->
			<div class="overflow-y-auto grow px-4 sm:px-8 py-6">
				<h2 class="text-xl font-semibold text-canvas-contrast mb-3">{selected.subject}</h2>
				<div class="flex items-center gap-3 mb-6 flex-wrap">
					<Avatar name={selected.from}/>
					<div>
						<p class="text-sm font-medium text-canvas-contrast">{selected.from}</p>
						<p class="text-xs text-muted-contrast">to me</p>
					</div>
					<div class="ml-auto flex gap-1.5 flex-wrap justify-end">
						{#each selected.labels as label}
							<span class="text-xs px-2 py-0.5 rounded-full font-medium {label.color}">{label.text}</span>
						{/each}
					</div>
				</div>
				<Card class="p-4 sm:p-6">
					<p class="text-sm text-canvas-contrast leading-relaxed whitespace-pre-line">{selected.body}</p>
				</Card>
				<div class="mt-4 flex items-center gap-2 text-xs text-muted-contrast">
					<Paperclip size={14}/>
					<span>No attachments</span>
				</div>
			</div>

			<!-- Reply bar -->
			<div class="px-4 sm:px-6 pb-4 sm:pb-6 shrink-0">
				<Card class="p-3 flex items-center gap-2">
					<Input placeholder="Reply to {selected.from}…" class="flex-1" compact/>
					<Button icon={Send} accent compact onclick={() => toast.show('Reply sent!', {type: 'success'})}/>
				</Card>
			</div>
		{:else}
			<EmptyState icon={defineIcon(Inbox)} title="Select a message to read" class="h-full justify-center"/>
		{/if}
	</div>
</Card>
