<script lang="ts">
	import { Field, Input } from '$lib';
	import { Lock } from 'lucide-svelte';

	let password = $state('');
	let weak = $derived(password.length > 0 && password.length < 8);
</script>

<div class="flex flex-col gap-4 w-80">
	<Field required {labelSnippet} {errorSnippet} {action}>
		<Input bind:value={password} type="password" placeholder="••••••••"/>
	</Field>
</div>

{#snippet labelSnippet()}
	<span class="flex items-center gap-1.5 text-sm font-medium text-canvas-contrast">
		<Lock size={14}/>
		Password
	</span>
{/snippet}

{#snippet action()}
	<a href="." class="text-xs text-accent hover:underline">Forgot?</a>
{/snippet}

{#snippet errorSnippet()}
	{#if weak}
		<span>
			Password is too short.
			<a href="." class="underline text-destructive">Learn more</a>.
		</span>
	{/if}
{/snippet}

