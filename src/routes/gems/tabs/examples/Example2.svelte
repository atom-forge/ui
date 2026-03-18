<script lang="ts">
	import { Tab, TabList, TabPanel, TabPanels, Tabs } from '$lib';
	import {Bell, Settings, User} from 'lucide-svelte';
</script>

<Tabs initialTabId="profile">
	<TabList>
		<Tab id="profile" icon={User}>Profile</Tab>
		<Tab id="settings" icon={Settings}>Settings</Tab>
		<Tab id="notifications" icon={Bell}>Notifications</Tab>
	</TabList>
	<TabPanels>
		<TabPanel id="profile">
			<p>User profile information.</p>
		</TabPanel>
		<TabPanel id="settings">
			<p>Application settings and preferences.</p>
		</TabPanel>
		<TabPanel id="notifications">
			<p>Notification settings.</p>
		</TabPanel>
	</TabPanels>
</Tabs>
