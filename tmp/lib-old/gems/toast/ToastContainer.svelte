<script lang="ts">
	import {fly} from 'svelte/transition';
	import {getToastManager} from '$lib/gems/toast/toast-manager.svelte.js';
	import Toast from '../../../../src/lib/gems/toast/Toast.svelte';

	const toastManager = getToastManager();
</script>

<div
	class="fixed z-9999 p-4 flex flex-col gap-3 pointer-events-none bottom-0 right-0 items-end"
>
	{#each toastManager.toasts as toast (toast.id)}
		<div class="pointer-events-auto"
		     in:fly={{y: 50, duration: 300}}
		     out:fly={{y: 50, duration: 200}}>
			{#if toast.component}
				<svelte:component this={toast.component} {...toast.props}/>
			{:else}
				<Toast id={toast.id} message={toast.message} options={toast.options}/>
			{/if}
		</div>
	{/each}
</div>
