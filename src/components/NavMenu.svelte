<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib';
	import { slide } from 'svelte/transition';
	import { NAV_GROUPS } from '../routes/nav.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { twMerge } from 'tailwind-merge';

	let { onNavigate = () => {} }: { onNavigate?: () => void } = $props();

	function isActive(path: string): boolean {
		if (!page.url) return false;
		return page.url.pathname === path || page.url.pathname.startsWith(path + '/');
	}

	function navClass(path: string): string {
		return isActive(path) ? 'bg-secondary' : '';
	}

	function loadGroups(): Record<string, boolean> {
		const defaults = Object.fromEntries(NAV_GROUPS.map((g) => [g.key, true]));
		if (!browser) return defaults;
		try {
			const saved = localStorage.getItem('nav-groups');
			return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
		} catch {
			return defaults;
		}
	}

	let navOpen = $state(loadGroups());

	function toggle(group: string) {
		navOpen = { ...navOpen, [group]: !navOpen[group] };
		if (browser) {
			localStorage.setItem('nav-groups', JSON.stringify(navOpen));
		}
	}

	function handleNavigate(path: string) {
		goto(path);
		onNavigate();
	}
</script>

<div class="grow flex flex-col gap-3 p-4">
	{#each NAV_GROUPS as group}
		<div>
			<button
				onclick={() => toggle(group.key)}
				class="w-full flex items-center justify-between px-2 mb-1 hover:text-canvas-contrast transition-colors"
			>
				<span class="text-xs font-semibold text-muted-contrast uppercase tracking-wider"
					>{group.label}</span
				>
				<span
					class="text-muted-contrast transition-transform duration-200"
					class:rotate-90={navOpen[group.key]}
					><ChevronRight size={12} /></span
				>
			</button>
			{#if navOpen[group.key]}
				<div class="flex flex-col gap-1" transition:slide|local={{ duration: 150 }}>
					{#each group.items as item}
						<Button
							icon={item.icon}
							label={item.label}
							ghost
							class={twMerge(navClass(item.value), 'py-6 md:py-2')}
							onclick={() => handleNavigate(item.value)}
						/>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>
