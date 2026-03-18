<script lang="ts">
	import {Tab, TabList, TabPanel, TabPanels, Tabs} from "$lib";
	import {Building, Calendar, Files, Rss} from "lucide-svelte";
	import FeedTab from "./widgets/FeedTab.svelte";
	import LeaveTab from "./widgets/LeaveTab.svelte";
	import BookingTab from "./widgets/BookingTab.svelte";
	import DocumentsTab from "./widgets/DocumentsTab.svelte";
</script>

<div class="flex flex-col gap-4">
	<div>
		<h2 class="text-2xl font-semibold text-canvas-contrast">Acme Corp Intranet</h2>
		<p class="text-sm text-muted-contrast">Welcome back, Elvis · Monday, February 1, 2026</p>
	</div>

	<Tabs initialTabId="feed">
		<TabList class="border-b border-frame">
			<Tab id="feed"><span class="flex items-center gap-1.5"><Rss size={15}/>Feed</span></Tab>
			<Tab id="leave"><span class="flex items-center gap-1.5"><Calendar size={15}/>Leave</span></Tab>
			<Tab id="booking"><span class="flex items-center gap-1.5"><Building size={15}/>Booking</span></Tab>
			<Tab id="documents"><span class="flex items-center gap-1.5"><Files size={15}/>Docs</span></Tab>
		</TabList>
		<TabPanels class="pt-4">
			<TabPanel id="feed"><FeedTab/></TabPanel>
			<TabPanel id="leave"><LeaveTab/></TabPanel>
			<TabPanel id="booking"><BookingTab/></TabPanel>
			<TabPanel id="documents"><DocumentsTab/></TabPanel>
		</TabPanels>
	</Tabs>
</div>
