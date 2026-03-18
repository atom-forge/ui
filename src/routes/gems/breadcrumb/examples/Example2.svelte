<script lang="ts">
	import { Breadcrumb } from '$lib';
</script>

<div class="flex flex-col gap-6">
	<div>
		<p class="text-xs text-muted-contrast mb-2">maxLabelLength={10}</p>
		<Breadcrumb
			maxLabelLength={10}
			items={[
				{ label: 'Home', href: '.' },
				{ label: 'Very Long Section Name', href: '.' },
				{ label: 'An Even Longer Page Title' },
			]}
		/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-2">maxSegments={3}</p>
		<Breadcrumb
			maxSegments={3}
			items={[
				{ label: 'Home', href: '.' },
				{ label: 'Projects', href: '.' },
				{ label: 'Atom Forge', href: '.' },
				{ label: 'Components', href: '.' },
				{ label: 'Breadcrumb' },
			]}
		/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-2">maxSegments={3} + maxLabelLength={12}</p>
		<Breadcrumb
			maxSegments={3}
			maxLabelLength={12}
			items={[
				{ label: 'Home', href: '.' },
				{ label: 'Very Long Projects', href: '.' },
				{ label: 'Atom Forge UI', href: '.' },
				{ label: 'Components', href: '.' },
				{ label: 'Breadcrumb Component' },
			]}
		/>
	</div>
</div>

