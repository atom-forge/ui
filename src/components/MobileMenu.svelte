<script lang="ts">
	import {goto} from '$app/navigation';
	import {Button, defineIcon, getDrawerManager, getThemeManager, Switch} from '$lib';
	import {Copyright, Heart, Moon, Cookie, Sun, X} from 'lucide-svelte';
	import NavMenu from './NavMenu.svelte';

	const themeManager = getThemeManager();
	const drawerManager = getDrawerManager();

	function navigate(path: string) {
		goto(path);
		drawerManager.close();
	}
</script>

<div class="flex flex-col h-full">
	<div class="flex justify-end p-2 border-b border-frame">
		<Button icon={X} onclick={() => drawerManager.close()} ghost/>
	</div>

	<div class="grow overflow-y-auto">
		<NavMenu onNavigate={() => drawerManager.close()}/>
	</div>

	<div class="py-2 pl-2 pr-6 border-t border-frame flex items-center justify-between">
		<div class="flex items-center gap-2">
			<Button
				icon={Cookie}
				onclick={() => navigate('/privacy-policy')}
				secondary outline
			/>
			<Button
				icon={Copyright}
				onclick={() => navigate('/licensing')}
				secondary
				outline
			/>
			<Button
				icon={defineIcon(Heart).class("text-red-500")}
				onclick={() => navigate('/licensing')}
				secondary
				outline
			/>
		</div>
		<Switch bind:value={themeManager.dark} icons={{ on: Moon, off: Sun }}/>
	</div>
</div>
