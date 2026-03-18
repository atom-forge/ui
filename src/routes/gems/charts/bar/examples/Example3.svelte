<script lang="ts">
	import { CjsBarChart } from '$lib';
</script>

<div class="h-64 w-full">
	<CjsBarChart
		horizontal
		labels={['CSS', 'TypeScript', 'Svelte', 'Rust', 'Go']}
		datasets={[
			{ label: 'Popularity', data: [78, 84, 62, 49, 71] },
		]}
	/>
</div>
