<script lang="ts">
	import { Avatar } from '$lib';
</script>

<div class="flex gap-4 items-center flex-wrap">
	<!-- Image avatar -->
	<Avatar src="https://i.pravatar.cc/150?img=1" name="Alice Johnson"/>
	<Avatar src="https://i.pravatar.cc/150?img=2" name="Bob Smith"/>
	<Avatar src="https://i.pravatar.cc/150?img=3" name="Carol White"/>

	<!-- Custom color override -->
	<Avatar name="Custom Red" color="bg-red-500/20 text-red-600"/>
	<Avatar name="Custom Teal" color="bg-teal-500/20 text-teal-600"/>

	<!-- No name fallback -->
	<Avatar/>
</div>
