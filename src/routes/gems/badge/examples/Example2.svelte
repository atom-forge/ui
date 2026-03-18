<script lang="ts">
	import { Badge, Button, defineIcon } from '$lib';
	import { Bell, Mail, Settings, User } from 'lucide-svelte';
</script>

<div class="flex flex-wrap gap-8 items-center">
	<Badge dot>
		<Button icon={defineIcon(Bell)} ghost/>
	</Badge>

	<Badge dot color="red">
		<Button icon={defineIcon(Mail)} ghost/>
	</Badge>

	<Badge dot color="green">
		<Button icon={defineIcon(Settings)} ghost/>
	</Badge>

	<Badge dot color="blue">
		<Button icon={defineIcon(User)} ghost/>
	</Badge>

	<Badge dot hidden>
		<Button icon={defineIcon(Bell)} ghost label="Hidden"/>
	</Badge>
</div>
