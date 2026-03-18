<script lang="ts">
	import { Badge, Button, defineIcon } from '$lib';
	import { Bell, Mail, ShoppingCart, User } from 'lucide-svelte';
</script>

<div class="flex flex-wrap gap-8 items-center">
	<Badge count={3}>
		<Button icon={defineIcon(Bell)} ghost/>
	</Badge>

	<Badge count={12} color="red">
		<Button icon={defineIcon(Mail)} ghost/>
	</Badge>

	<Badge count={5} color="green">
		<Button icon={defineIcon(ShoppingCart)} ghost/>
	</Badge>

	<Badge count={99} color="blue">
		<Button icon={defineIcon(User)} ghost/>
	</Badge>

	<Badge count={142} max={99} color="red">
		<Button icon={defineIcon(Bell)} ghost/>
	</Badge>

	<Badge count={0}>
		<Button icon={defineIcon(Mail)} ghost/>
	</Badge>
</div>
