<script lang="ts">
	import { PieChart } from '@atom-forge/ui';
</script>

<div class="h-64 w-full">
	<PieChart
        options={{ maintainAspectRatio: false }}
		labels={['Direct', 'Social', 'Email', 'Referral', 'Other']}
		data={[35, 25, 18, 14, 8]}
	/>
</div>
