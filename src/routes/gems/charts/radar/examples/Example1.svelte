<script lang="ts">
	import { RadarChart } from '$lib';
</script>

<div class="h-64 w-full">
	<RadarChart
		labels={['Speed', 'Strength', 'Stamina', 'Agility', 'Intelligence', 'Defense']}
		datasets={[
			{ label: 'Warrior', data: [60, 90, 70, 55, 40, 85] },
			{ label: 'Mage', data: [50, 30, 55, 65, 95, 40] },
			{ label: 'Rogue', data: [85, 55, 60, 90, 70, 50] },
		]}
	/>
</div>
