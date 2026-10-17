<script lang="ts">
	import { CjsBarChart } from '@atom-forge/ui';
</script>

<div class="h-64 w-full">
	<CjsBarChart
        options={{ maintainAspectRatio: false }}
		horizontal
		labels={['CSS', 'TypeScript', 'Svelte', 'Rust', 'Go']}
		datasets={[
			{ label: 'Popularity', data: [78, 84, 62, 49, 71] },
		]}
	/>
</div>
