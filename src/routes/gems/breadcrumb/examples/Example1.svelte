<script lang="ts">
	import { Breadcrumb } from '$lib';
</script>

<div class="flex flex-col gap-6">
	<Breadcrumb items={[
		{ label: 'Home', href: '.' },
		{ label: 'Settings', href: '.' },
		{ label: 'Profile' },
	]}/>

	<Breadcrumb items={[
		{ label: 'Dashboard', href: '.' },
		{ label: 'Projects', href: '.' },
		{ label: 'Atom Forge', href: '.' },
		{ label: 'Components', href: '.' },
		{ label: 'Breadcrumb' },
	]}/>

	<Breadcrumb items={[
		{ label: 'Home', href: '.' },
		{ label: 'Breadcrumb' },
	]}/>
</div>
