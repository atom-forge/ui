<script lang="ts">
	import {Skeleton} from '$lib';
</script>

<div class="flex flex-col gap-6 w-80">
	<!-- Avatar + text row -->
	<div class="flex items-center gap-3">
		<Skeleton circle class="w-10 h-10 shrink-0"/>
		<Skeleton length={[60, 100]}  class="flex-1"/>
	</div>

	<!-- Rectangle -->
	<Skeleton rect class="w-full h-32"/>

	<!-- Text block -->
	<Skeleton length={[100, 100, 75]}/>
</div>

