<script lang="ts">
	import { Tab, TabList, TabPanel, TabPanels, Tabs } from '$lib';
	import {AlertCircle, CircleCheck, Info} from 'lucide-svelte';
</script>

<Tabs initialTabId="tab1">
	<TabList>
		<Tab id="tab1" icon={Info}>Info</Tab>
		<Tab id="tab2" icon={AlertCircle}>Alert</Tab>
		<Tab id="tab3" icon={CircleCheck}>Success</Tab>
	</TabList>
	<TabPanels>
		<TabPanel id="tab1">
			<p>Content for the Info tab.</p>
		</TabPanel>
		<TabPanel id="tab2">
			<p>Content for the Alert tab.</p>
		</TabPanel>
		<TabPanel id="tab3">
			<p>Content for the Success tab.</p>
		</TabPanel>
	</TabPanels>
</Tabs>
