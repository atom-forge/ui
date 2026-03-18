<script lang="ts">
	import { Button, defineIcon, getToastManager } from "$lib";
	import {Heart} from "lucide-svelte";

	const toastManager = getToastManager();

	function showCustomIconToast() {
		toastManager.show("You liked this!", {icon: defineIcon(Heart, 5).class("text-red-500")});
	}
</script>

<Button label="Show Custom Icon" onclick={showCustomIconToast}/>
