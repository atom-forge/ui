<script lang="ts">
	import { Input } from "$lib";
</script>

<div class="space-y-4">
	<Input type="text" placeholder="Text (default)"/>
	<Input type="integer" placeholder="Integer (allows only numbers)"/>
	<Input type="float" placeholder="Float (allows numbers and one decimal point)"/>
	<Input type="password" placeholder="Password (masks input)"/>
</div>
