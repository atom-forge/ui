<script lang="ts">
	import { ProgressRing } from '$lib';
</script>

<div class="flex flex-wrap gap-8 items-center">
	<ProgressRing value={72} size={80} strokeWidth={8} />
	<ProgressRing value={72} size={120} strokeWidth={12} />
	<ProgressRing value={72} size={160} strokeWidth={16} />

	<ProgressRing value={45} color="#10b981" trackColor="#d1fae5" label="Tasks" />
	<ProgressRing value={83} color="#8b5cf6" trackColor="#ede9fe" />
	<ProgressRing value={60} color="#ef4444" trackColor="#fee2e2" />
</div>
