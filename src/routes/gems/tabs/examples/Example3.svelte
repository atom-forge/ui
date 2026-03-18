<script lang="ts">
	import { Tab, TabList, TabPanel, TabPanels, Tabs } from '$lib';
	import {AlertCircle, CircleCheck, Info} from 'lucide-svelte';
</script>

<Tabs initialTabId="tab1" variant="button">
	<TabList>
		<Tab id="tab1" icon={Info}>Info</Tab>
		<Tab id="tab2" icon={AlertCircle}>Alert</Tab>
		<Tab id="tab3" icon={CircleCheck}>Success</Tab>
	</TabList>
	<TabPanels>
		<TabPanel id="tab1">
			<p class="p-4">Content for the Info tab (button variant).</p>
		</TabPanel>
		<TabPanel id="tab2">
			<p class="p-4">Content for the Alert tab (button variant).</p>
		</TabPanel>
		<TabPanel id="tab3">
			<p class="p-4">Content for the Success tab (button variant).</p>
		</TabPanel>
	</TabPanels>
</Tabs>
