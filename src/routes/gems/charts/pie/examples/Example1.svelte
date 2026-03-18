<script lang="ts">
	import { PieChart } from '$lib';
</script>

<div class="h-64 w-full">
	<PieChart
		labels={['Direct', 'Social', 'Email', 'Referral', 'Other']}
		data={[35, 25, 18, 14, 8]}
	/>
</div>
