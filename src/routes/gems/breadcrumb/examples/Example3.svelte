<script lang="ts">
	import { Breadcrumb, getToastManager } from '$lib';

	const toast = getToastManager();
</script>

<div class="flex flex-col gap-6">
	<Breadcrumb items={[
		{ label: 'Home', onclick: () => toast.show('Home clicked') },
		{ label: 'Projects', onclick: () => toast.show('Projects clicked') },
		{ label: 'Atom Forge' },
	]}/>

	<!-- Mix of href and onclick -->
	<Breadcrumb items={[
		{ label: 'Home', href: '.' },
		{ label: 'Settings', onclick: () => toast.show('Settings clicked') },
		{ label: 'Profile' },
	]}/>
</div>

