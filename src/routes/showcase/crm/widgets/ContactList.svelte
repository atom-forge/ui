<script lang="ts">
	import {Avatar, Badge, Button, Chip, Tooltip, getDrawerManager} from '$lib';
	import {Mail, Phone, Star} from 'lucide-svelte';
	import ContactDrawer from '../ContactDrawer.svelte';

	let {search = ''}: {search?: string} = $props();

	const drawer = getDrawerManager();

	type Contact = {
		id: number; name: string; company: string; email: string; phone: string;
		status: 'lead' | 'prospect' | 'customer' | 'churned';
		value: string; starred: boolean; tags: string[];
	};

	let contacts = $state<Contact[]>([
		{id: 1,  name: 'Sarah Connor',    company: 'Skynet Solutions',   email: 'sarah@skynet.io',    phone: '+1 555-0101', status: 'customer',  value: '$12,400', starred: true,  tags: ['Enterprise']},
		{id: 2,  name: 'John Martinez',   company: 'Acme Corp',          email: 'john@acme.com',      phone: '+1 555-0102', status: 'prospect',  value: '$8,200',  starred: false, tags: ['SMB']},
		{id: 3,  name: 'Laura Kim',       company: 'DesignHub',          email: 'laura@designhub.co', phone: '+1 555-0103', status: 'lead',      value: '$3,100',  starred: true,  tags: ['Agency']},
		{id: 4,  name: 'Tom Reed',        company: 'BuildFast Inc',      email: 'tom@buildfast.dev',  phone: '+1 555-0104', status: 'customer',  value: '$21,000', starred: false, tags: ['Enterprise', 'Priority']},
		{id: 5,  name: 'Andras Kovacs',   company: 'CodeBase Ltd',       email: 'andras@codebase.hu', phone: '+36 555-0105',status: 'prospect',  value: '$5,500',  starred: false, tags: ['SMB']},
		{id: 6,  name: 'Maya Patel',      company: 'GrowthLab',          email: 'maya@growthlab.io',  phone: '+1 555-0106', status: 'lead',      value: '$1,200',  starred: false, tags: ['Startup']},
		{id: 7,  name: 'Chris Walker',    company: 'RetailPro',          email: 'chris@retailpro.com',phone: '+1 555-0107', status: 'churned',   value: '$4,800',  starred: false, tags: ['SMB']},
		{id: 8,  name: 'Elena Rossi',     company: 'MediaWave',          email: 'elena@mediawave.eu', phone: '+39 555-0108',status: 'customer',  value: '$9,300',  starred: true,  tags: ['Agency', 'Priority']},
		{id: 9,  name: 'David Chen',      company: 'TechStart',          email: 'david@techstart.vc', phone: '+1 555-0109', status: 'prospect',  value: '$15,000', starred: false, tags: ['Startup', 'Enterprise']},
		{id: 10, name: 'Fiona Grant',     company: 'GreenOps',           email: 'fiona@greenops.eco', phone: '+44 555-0110',status: 'lead',      value: '$2,400',  starred: false, tags: ['SMB']},
	]);

	const statusColor: Record<Contact['status'], 'green' | 'blue' | 'accent' | 'red'> = {
		customer: 'green', prospect: 'blue', lead: 'accent', churned: 'red'
	};

	const filtered = $derived(
		search.trim()
			? contacts.filter(c =>
				c.name.toLowerCase().includes(search.toLowerCase()) ||
				c.company.toLowerCase().includes(search.toLowerCase()) ||
				c.email.toLowerCase().includes(search.toLowerCase())
			)
			: contacts
	);

	function toggleStar(id: number) {
		contacts = contacts.map(c => c.id === id ? {...c, starred: !c.starred} : c);
	}

	function openContact(contact: Contact) {
		drawer.open(ContactDrawer, {
			contact,
			onSave: (updated: Contact) => {
				contacts = contacts.map(c => c.id === updated.id ? updated : c);
			},
			onDelete: (id: number) => {
				contacts = contacts.filter(c => c.id !== id);
			}
		}, {position: 'right', size: 'sm'});
	}
</script>

<table class="w-full text-sm">
	<thead>
		<tr class="border-b border-frame text-xs text-muted-contrast font-semibold uppercase tracking-wide">
			<th class="py-2 px-3 text-left w-8"></th>
			<th class="py-2 px-3 text-left">Name</th>
			<th class="py-2 px-3 text-left hidden sm:table-cell">Company</th>
			<th class="py-2 px-3 text-left">Status</th>
			<th class="py-2 px-3 text-left hidden lg:table-cell">Tags</th>
			<th class="py-2 px-3 text-right hidden sm:table-cell">Value</th>
			<th class="py-2 px-3 text-right">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each filtered as c (c.id)}
			<tr
				role="button"
				tabindex="0"
				onclick={() => openContact(c)}
				onkeydown={e => e.key === 'Enter' && openContact(c)}
				class="border-b border-frame hover:bg-secondary/50 transition-colors group cursor-pointer"
			>
				<td class="py-2 px-3">
					<button
						onclick={e => { e.stopPropagation(); toggleStar(c.id); }}
						class="text-muted-contrast hover:text-yellow-400 transition-colors"
					>
						{#if c.starred}
							<Star size={14} class="text-yellow-400 fill-current"/>
						{:else}
							<Star size={14}/>
						{/if}
					</button>
				</td>
				<td class="py-2 px-3">
					<div class="flex items-center gap-2">
						<Avatar name={c.name} small/>
						<div>
							<p class="font-medium text-canvas-contrast">{c.name}</p>
							<p class="text-xs text-muted-contrast hidden sm:block">{c.email}</p>
						</div>
					</div>
				</td>
				<td class="py-2 px-3 text-muted-contrast hidden sm:table-cell">{c.company}</td>
				<td class="py-2 px-3">
					<Badge color={statusColor[c.status]}>{c.status}</Badge>
				</td>
				<td class="py-2 px-3 hidden lg:table-cell">
					<div class="flex gap-1 flex-wrap">
						{#each c.tags as tag}
							<Chip>{tag}</Chip>
						{/each}
					</div>
				</td>
				<td class="py-2 px-3 text-right font-medium text-canvas-contrast hidden sm:table-cell">{c.value}</td>
				<td class="py-2 px-3">
					<div class="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity" role="none" onclick={e => e.stopPropagation()}>
						<Tooltip label="Send email">
							<Button icon={Mail} ghost micro href="mailto:{c.email}"/>
						</Tooltip>
						<Tooltip label="Call">
							<Button icon={Phone} ghost micro href="tel:{c.phone}"/>
						</Tooltip>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

{#if filtered.length === 0}
	<div class="py-16 text-center text-muted-contrast text-sm">No contacts match your search.</div>
{/if}

