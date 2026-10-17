<script lang="ts">
	import { Switch, defineIcon, getThemeManager } from '@atom-forge/ui';
	import { Moon, Sun } from 'lucide-svelte';

	const theme = getThemeManager();
</script>

{#if theme}
	<Switch bind:value={theme.dark} icons={{ on: defineIcon(Moon), off: defineIcon(Sun) }} />
{/if}
