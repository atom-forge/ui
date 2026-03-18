<script lang="ts">
	import {goto} from '$app/navigation';
	import {Button, CommandPalette, getModalManager, type CommandItem} from '$lib';
	import {
		ArrowRight,
		Building2,
		Check,
		Heart,
		Inbox,
		Search,
		User,
		Users,
	} from 'lucide-svelte';
	import {ALL_GEMS, type NavItem} from './nav.svelte';

	const modal = getModalManager();

	const gemCommands: CommandItem[] = ALL_GEMS.map((g: NavItem) => ({
		id: g.value,
		label: g.label,
		description: g.description,
		group: g.group,
		icon: g.icon,
		keywords: g.keywords,
		onSelect: () => goto(g.value),
	}));

	function openCommandPalette() {
		modal.open(CommandPalette, {
			items: [...gemCommands],
			placeholder: 'Search components...',
			close: () => modal.close(),
		}, 'command-palette');
	}
	const showcases: {icon: any; title: string; desc: string; href: string}[] = [
		{
			icon: Users,
			title: 'CRM',
			desc: 'Contacts table, deal pipeline with drag-and-drop, and activity feed.',
			href: '/showcase/crm',
		},
		{
			icon: Inbox,
			title: 'Inbox',
			desc: 'Message list with threading, search, and an action side panel.',
			href: '/showcase/inbox',
		},
		{
			icon: Building2,
			title: 'Intranet',
			desc: 'Company portal with announcements, directory, and navigation.',
			href: '/showcase/intranet',
		},
	];
</script>

<!-- Hero -->
<div class="text-center space-y-5 py-10">
	<h1 class="text-4xl font-bold tracking-tight text-canvas-contrast">
		Welcome to <span class="font-extralight">Atom</span><strong>Forge<span class="text-accent">UI</span></strong>
	</h1>
	<p class="text-base text-muted-contrast max-w-xl mx-auto leading-relaxed">
		A Svelte 5 component library built on Tailwind CSS 4. Composable, themeable, and built for
		real applications.
	</p>
	<div class="flex justify-center gap-3 pt-2">
		<Button label="Get Started" icon={ArrowRight} onclick={() => goto('/guides/getting-started')}/>
		<Button label="Browse Components" icon={Search} ghost onclick={openCommandPalette}/>
	</div>
	<div class="flex justify-center items-center gap-3 pt-1">
		<span class="text-xs text-muted-contrast">Support this project on</span>
		<a href="https://github.com/sponsors/atom-forge" target="_blank" rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline transition-colors">
			<Heart size={12} class="text-red-500"/>GitHub Sponsors
		</a>
	</div>
</div>

<!-- About AtomForgeUI -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
	<div class="md:col-span-3 p-6 rounded-xl border border-frame bg-surface flex flex-col gap-3">
		<p class="text-xs font-semibold text-muted-contrast uppercase tracking-wider">What is AtomForge<span class="text-accent">UI</span>?</p>
		<p class="text-sm text-canvas-contrast leading-relaxed max-w-3xl">
			<strong>AtomForge<span class="text-accent">UI</span></strong> was born from a different philosophy.
			shadcn/ui has a beautiful aesthetic — but its "copy components into your project" model
			and API design simply don't match the way I think about libraries.
		</p>
		<p class="text-sm text-canvas-contrast leading-relaxed max-w-3xl">
			A library should be a <strong>dependency</strong>, not a pile of files in your repo.
			You install it once, import what you need, and it works — with a single source of truth,
			no version drift, and most importantly a <span class="text-accent font-medium">fluent, composable API</span>
			that reads like prose and stays out of your way.
		</p>
		<p class="text-sm text-canvas-contrast leading-relaxed max-w-3xl">
			Built on <strong>Svelte 5</strong> with runes, styled with <strong>Tailwind CSS 4</strong>,
			and designed with real applications in mind — not just demos.
		</p>
	</div>
	<div class="p-5 rounded-xl border border-frame bg-surface flex flex-col gap-2">
		<p class="text-sm font-semibold text-canvas-contrast">Proper package</p>
		<p class="text-xs text-muted-contrast leading-relaxed">Install it once with <code class="font-mono bg-secondary px-1 py-0.5 rounded text-accent">npm install @atom-forge/ui</code> and import exactly what you need. No file copying, no manual updates.</p>
	</div>
	<div class="p-5 rounded-xl border border-frame bg-surface flex flex-col gap-2">
		<p class="text-sm font-semibold text-canvas-contrast">Fluent API</p>
		<p class="text-xs text-muted-contrast leading-relaxed">Every component is designed with the same philosophy: props that make sense, snippets where flexibility is needed, and consistent behaviour across the board.</p>
	</div>
	<div class="p-5 rounded-xl border border-frame bg-surface flex flex-col gap-2">
		<p class="text-sm font-semibold text-canvas-contrast">Real-world ready</p>
		<p class="text-xs text-muted-contrast leading-relaxed">From simple buttons to drag-and-drop kanban boards and date pickers — built and battle-tested in actual applications, not just component showcases.</p>
	</div>
</div>

<!-- Showcases -->
<div class="space-y-3">
	<h2 class="text-xs font-semibold text-muted-contrast uppercase tracking-wider">Showcase Apps</h2>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
		{#each showcases as s}
			{@const Ico = s.icon}
			<button
				onclick={() => goto(s.href)}
				class="p-4 rounded-lg bg-surface border-frame text-left hover:bg-secondary transition-colors group flex flex-col gap-3 cursor-pointer"
			>
				<div class="text-accent">
					<Ico size={22}/>
				</div>
				<div>
					<div class="text-sm font-semibold text-canvas-contrast flex items-center gap-1">
						{s.title}
						<span class="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-150">
							<ArrowRight size={12}/>
						</span>
					</div>
					<p class="text-xs text-muted-contrast mt-1 leading-relaxed">{s.desc}</p>
				</div>
			</button>
		{/each}
	</div>
</div>

<!-- Licensing -->
<div class="space-y-3 pt-4">
	<h2 class="text-xs font-semibold text-muted-contrast uppercase tracking-wider">Licensing</h2>
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
		<!-- Free -->
		<div class="p-4 rounded-lg bg-surface border-frame flex flex-col gap-3">
			<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Free</p>
			<ul class="flex flex-col gap-1.5 text-xs text-muted-contrast">
				{#each ['Personal & hobby projects', 'Open source', 'Non-profits', 'Learning & evaluation'] as item}
					<li class="flex items-center gap-2"><Check size={12} class="text-green-500 shrink-0"/>{item}</li>
				{/each}
			</ul>
		</div>
		<!-- Commercial -->
		<div class="p-4 rounded-lg bg-surface border border-accent flex flex-col gap-3">
			<p class="text-xs font-semibold uppercase tracking-widest text-accent">Commercial — honor-based</p>
			<ul class="flex flex-col gap-1.5 text-xs text-muted-contrast">
				{#each ['For-profit products & SaaS', 'Paid client work', 'Internal tools at companies'] as item}
					<li class="flex items-center gap-2"><Check size={12} class="text-accent shrink-0"/>{item}</li>
				{/each}
			</ul>
			<div class="flex gap-2 mt-auto">
				<a href="https://github.com/sponsors/atom-forge" target="_blank" rel="noopener noreferrer"
					class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-accent text-accent text-xs font-medium px-3 py-1.5 hover:bg-accent/10 transition-colors">
					<Heart size={12} class="text-red-500"/>Support on GitHub
				</a>
			</div>
		</div>
		<!-- Pro -->
		<div class="p-4 rounded-lg bg-surface border-frame flex flex-col gap-3 opacity-60">
			<div class="flex items-center justify-between">
				<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Pro Patron</p>
				<span class="text-[10px] font-bold uppercase tracking-widest bg-muted/20 text-muted-contrast rounded-full px-2 py-0.5">Coming Soon</span>
			</div>
			<ul class="flex flex-col gap-1.5 text-xs text-muted-contrast">
				{#each ['Everything in Commercial', '@atom-forge/ui-pro package', 'Advanced components'] as item}
					<li class="flex items-center gap-2"><Check size={12} class="shrink-0"/>{item}</li>
				{/each}
			</ul>
		</div>
	</div>
	<p class="text-xs text-muted-contrast">
		Full details on the <button class="text-accent hover:underline" onclick={() => goto('/licensing')}>Licensing page</button>.
	</p>
</div>

<!-- About the Author -->
<div class="pt-2">
	<button
		onclick={() => goto('/about')}
		class="w-full flex items-center gap-4 p-4 rounded-xl border border-frame hover:border-accent/40 hover:bg-accent/5 transition-all group text-left cursor-pointer"
	>
		<div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent/20 transition-colors">
			<User size={18}/>
		</div>
		<div class="flex-1 min-w-0">
			<p class="text-sm font-semibold text-canvas-contrast">About the Author</p>
			<p class="text-xs text-muted-contrast">Gergely Laborci · Web developer since 1999, university lecturer, Svelte enthusiast.</p>
		</div>
		<ArrowRight size={16} class="text-muted-contrast group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0"/>
	</button>
</div>
