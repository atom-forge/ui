<script lang="ts">
	import {Card} from "@atom-forge/ui";
	import {ArrowRight, Book} from "lucide-svelte";
	import {NAV_GROUPS} from "../../site/nav";

	const showcase = [
		{name: 'CRM', href: '/showcase/crm/', text: 'Contacts, deals and a detail drawer.'},
		{name: 'Inbox', href: '/showcase/inbox/', text: 'A mail-style list and reader.'},
		{name: 'Intranet', href: '/showcase/intranet/', text: 'Documents, bookings and a company portal.'},
	];
</script>

<div class="max-w-5xl mx-auto pb-8 space-y-8">
	<Card class="p-6 md:p-12 space-y-4 border-accent/20">
		<p class="text-accent text-xs font-bold uppercase tracking-[0.2em]">@atom-forge/ui · Live examples</p>
		<h1 class="text-4xl md:text-5xl font-black tracking-tight text-canvas-contrast">Every component, running.</h1>
		<p class="text-muted-contrast leading-relaxed max-w-3xl">Browse the components of the AtomForge UI library with working examples, or open one of the complete showcase applications. Search with <kbd>⌘K</kbd>.</p>
		<div class="flex flex-wrap gap-3">
			<a href="https://books.atom-forge.eu/ui/" class="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-accent-contrast no-underline hover:opacity-90"><Book size={18}/> Read the documentation</a>
			<a href="https://atom-forge.eu/ui" class="inline-flex items-center gap-2 rounded-lg border border-frame px-5 py-3 font-semibold text-canvas-contrast no-underline hover:border-accent">About the library <ArrowRight size={18}/></a>
		</div>
	</Card>

	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-canvas-contrast">Showcase applications</h2>
		<div class="grid gap-4 sm:grid-cols-3">
			{#each showcase as app}
				<a href={app.href} class="rounded-xl border border-frame bg-surface p-6 space-y-2 no-underline hover:border-accent transition-colors">
					<h3 class="text-lg font-semibold text-canvas-contrast">{app.name}</h3>
					<p class="text-sm text-muted-contrast">{app.text}</p>
				</a>
			{/each}
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-canvas-contrast">Components</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each NAV_GROUPS as group}
				<a href={group.items[0].value + '/'} class="rounded-xl border border-frame bg-surface p-6 space-y-2 no-underline hover:border-accent transition-colors">
					<h3 class="text-lg font-semibold text-canvas-contrast">{group.label}</h3>
					<p class="text-sm text-muted-contrast">{group.items.length} components</p>
				</a>
			{/each}
		</div>
	</section>
</div>
