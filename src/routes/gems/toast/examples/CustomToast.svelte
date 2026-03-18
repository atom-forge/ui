<script lang="ts">
	import { Button, Icon, getToastManager } from "$lib";
	import {Smile} from "lucide-svelte";

	let { name, id } = $props<{ name: string; id: string }>();

	const toastManager = getToastManager();

	function greet() {
		alert(`Hello, ${name}!`);
		toastManager.dismiss(id);
	}
</script>

<div class="flex items-center gap-3 p-4 rounded-lg shadow-lg bg-purple-600 text-white max-w-xs w-full">
	<Icon icon={Smile} size="8" />
	<div>
		<p class="font-bold">Custom Greeting!</p>
		<p>Hello, {name}! Nice to see you.</p>
		<Button ghost compact class="mt-2" onclick={greet}>Say Hello</Button>
	</div>
</div>
