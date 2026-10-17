<script lang="ts">
	import { Avatar } from '@atom-forge/ui';
</script>

<div class="flex gap-4 items-center flex-wrap">
	<!-- Image avatar -->
	<Avatar src="https://i.pravatar.cc/150?img=1" name="Alice Johnson"/>
	<Avatar src="https://i.pravatar.cc/150?img=2" name="Bob Smith"/>
	<Avatar src="https://i.pravatar.cc/150?img=3" name="Carol White"/>

	<!-- Custom color override -->
	<Avatar name="Accent Avatar" color="bg-accent text-accent-contrast"/>
	<Avatar name="Secondary Avatar" color="bg-secondary text-secondary-contrast"/>

	<!-- No name fallback -->
	<Avatar/>
</div>
