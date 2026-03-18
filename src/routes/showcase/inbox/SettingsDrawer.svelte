<script lang="ts">
	import {Avatar, Button, Card, Checkbox, Input, NativeSelect, RadioButton, RadioGroup, Slider, Switch, getDrawerManager, getToastManager, Field} from '$lib';
	import {Bell, Save, Key, Palette, Trash, User} from 'lucide-svelte';

	const drawer = getDrawerManager();
	const toast = getToastManager();

	const sections = [
		{id: 'profile',       label: 'Profile',       icon: User},
		{id: 'appearance',    label: 'Appearance',     icon: Palette},
		{id: 'notifications', label: 'Notifications',  icon: Bell},
		{id: 'security',      label: 'Security',       icon: Key},
	];

	let activeSection = $state('profile');

	// Profile
	let name     = $state('Elvis Presley');
	let email    = $state('elvis@atomforge.dev');
	let bio      = $state('Building great UI components with Svelte 5 and Tailwind CSS 4.');
	let timezone = $state('Europe/Budapest');
	const timezoneOptions = [
		{value: 'Europe/Budapest',     label: 'Europe/Budapest (UTC+1)'},
		{value: 'Europe/London',       label: 'Europe/London (UTC+0)'},
		{value: 'America/New_York',    label: 'America/New_York (UTC-5)'},
		{value: 'America/Los_Angeles', label: 'America/Los_Angeles (UTC-8)'},
		{value: 'Asia/Tokyo',          label: 'Asia/Tokyo (UTC+9)'},
	];

	// Appearance
	let fontSize = $state(14);
	let density  = $state<'comfortable' | 'compact' | 'cozy'>('comfortable');
	let language = $state('en');
	const languageOptions = [
		{value: 'en', label: 'English'},
		{value: 'hu', label: 'Hungarian'},
		{value: 'de', label: 'German'},
		{value: 'fr', label: 'French'},
	];

	// Notifications
	let emailDigest      = $state(true);
	let pushEnabled      = $state(true);
	let slackIntegration = $state(false);
	let digestFrequency  = $state<'daily' | 'weekly' | 'never'>('daily');
	let notifyOnNewUser  = $state(true);
	let notifyOnOrder    = $state(true);
	let notifyOnTicket   = $state(false);

	// Security
	let twoFactorEnabled = $state(false);
	let sessionTimeout   = $state(30);

	function save() {
		toast.show('Settings saved!', {type: 'success'});
		drawer.close();
	}
</script>

<div class="flex flex-col h-full">
	<!-- Header -->
	<div class="flex items-center justify-between px-6 py-4 border-b border-frame shrink-0">
		<h2 class="text-lg font-semibold text-canvas-contrast">Settings</h2>
	</div>

	<!-- Body: left nav + content -->
	<div class="flex flex-1 min-h-0 overflow-hidden">
		<!-- Section nav -->
		<div class="w-44 shrink-0 border-r border-frame flex flex-col gap-0.5 p-3">
			{#each sections as s}
				<Button
					icon={s.icon}
					label={s.label}
					{...activeSection === s.id ? {accent: true} : {ghost: true}}
					compact
					onclick={() => activeSection = s.id}
					class="justify-start"
				/>
			{/each}
		</div>

		<!-- Section content -->
		<div class="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
			{#if activeSection === 'profile'}
				<div>
					<h3 class="font-semibold text-canvas-contrast">Profile</h3>
					<p class="text-sm text-muted-contrast">Your personal information and account details.</p>
				</div>
				<Card class="p-5 flex flex-col gap-4">
					<div class="flex items-center gap-4 pb-2 border-b border-frame">
						<Avatar name="Elvis" class="h-12 w-12 text-lg"/>
						<div>
							<p class="text-sm font-medium text-canvas-contrast">{name}</p>
							<p class="text-xs text-muted-contrast">{email}</p>
						</div>
						<Button label="Change" ghost compact class="ml-auto"/>
					</div>
					<Field label="Full name">
						<Input bind:value={name}/>
					</Field>
					<Field label="Email">
						<Input bind:value={email}/>
					</Field>
					<Field label="Bio">
						<textarea bind:value={bio} rows={3}
							class="w-full rounded-md border border-frame bg-control px-3 py-2 text-sm text-canvas-contrast resize-none focus:outline-none focus:ring-2 focus:ring-accent/40"
						></textarea>
					</Field>
					<Field label="Timezone">
						<NativeSelect bind:value={timezone} options={timezoneOptions}/>
					</Field>
				</Card>
				<Card class="p-5 border border-red-200 dark:border-red-900/50 flex flex-col gap-3">
					<h4 class="text-sm font-semibold text-red-600">Danger Zone</h4>
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-canvas-contrast">Delete account</p>
							<p class="text-xs text-muted-contrast">Permanently removes your account and all data.</p>
						</div>
						<Button label="Delete" destructive compact icon={Trash}/>
					</div>
				</Card>

			{:else if activeSection === 'appearance'}
				<div>
					<h3 class="font-semibold text-canvas-contrast">Appearance</h3>
					<p class="text-sm text-muted-contrast">Customize how the interface looks for you.</p>
				</div>
				<Card class="p-5 flex flex-col gap-5">
					<div class="flex flex-col gap-2">
						<p class="text-sm font-medium text-canvas-contrast">Interface density</p>
						<RadioGroup bind:value={density} class="flex flex-col gap-2 mt-1">
							<RadioButton value="comfortable" label="Comfortable — More breathing room"/>
							<RadioButton value="compact"     label="Compact — Standard spacing"/>
							<RadioButton value="cozy"        label="Cozy — Tighter, information-dense"/>
						</RadioGroup>
					</div>
					<div class="flex flex-col gap-2 border-t border-frame pt-4">
						<div class="flex items-center justify-between">
							<p class="text-sm font-medium text-canvas-contrast">Base font size</p>
							<span class="text-sm font-mono text-accent">{fontSize}px</span>
						</div>
						<Slider bind:value={fontSize} min={12} max={20} step={1}/>
						<div class="flex justify-between text-xs text-muted-contrast"><span>12px</span><span>20px</span></div>
					</div>
					<Field label="Language" class="border-t border-frame pt-4">
						<NativeSelect bind:value={language} options={languageOptions}/>
					</Field>
				</Card>

			{:else if activeSection === 'notifications'}
				<div>
					<h3 class="font-semibold text-canvas-contrast">Notifications</h3>
					<p class="text-sm text-muted-contrast">Manage how and when you receive notifications.</p>
				</div>
				<Card class="p-5 flex flex-col gap-5">
					<div class="flex flex-col gap-3">
						<p class="text-xs font-semibold text-muted-contrast uppercase tracking-wider">Channels</p>
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-canvas-contrast">Email digest</p>
								<p class="text-xs text-muted-contrast">Receive a summary of activity by email.</p>
							</div>
							<Switch bind:value={emailDigest}/>
						</div>
						{#if emailDigest}
							<div class="ml-4 flex flex-col gap-1.5">
								<p class="text-xs font-medium text-muted-contrast">Frequency</p>
								<RadioGroup bind:value={digestFrequency} class="flex gap-4">
									<RadioButton value="daily"  label="Daily"/>
									<RadioButton value="weekly" label="Weekly"/>
									<RadioButton value="never"  label="Never"/>
								</RadioGroup>
							</div>
						{/if}
						<div class="flex items-center justify-between border-t border-frame pt-3">
							<div>
								<p class="text-sm font-medium text-canvas-contrast">Push notifications</p>
								<p class="text-xs text-muted-contrast">In-app notifications in real time.</p>
							</div>
							<Switch bind:value={pushEnabled}/>
						</div>
						<div class="flex items-center justify-between border-t border-frame pt-3">
							<div>
								<p class="text-sm font-medium text-canvas-contrast">Slack integration</p>
								<p class="text-xs text-muted-contrast">Post important events to a Slack channel.</p>
							</div>
							<Switch bind:value={slackIntegration}/>
						</div>
					</div>
					<div class="flex flex-col gap-3 border-t border-frame pt-4">
						<p class="text-xs font-semibold text-muted-contrast uppercase tracking-wider">Notify me about</p>
						<Checkbox bind:value={notifyOnNewUser} label="New user registrations"/>
						<Checkbox bind:value={notifyOnOrder}   label="New orders and payments"/>
						<Checkbox bind:value={notifyOnTicket}  label="Support ticket updates"/>
					</div>
				</Card>

			{:else if activeSection === 'security'}
				<div>
					<h3 class="font-semibold text-canvas-contrast">Security</h3>
					<p class="text-sm text-muted-contrast">Protect your account with additional layers of security.</p>
				</div>
				<Card class="p-5 flex flex-col gap-5">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-canvas-contrast">Two-factor authentication</p>
							<p class="text-xs text-muted-contrast">Add an extra layer of security with an authenticator app.</p>
						</div>
						<Switch bind:value={twoFactorEnabled}/>
					</div>
					{#if twoFactorEnabled}
						<div class="ml-4 p-3 rounded-md bg-green-500/10 border border-green-500/20 flex flex-col gap-2">
							<p class="text-sm font-medium text-green-600">2FA is active</p>
							<p class="text-xs text-muted-contrast">Your account is protected with Google Authenticator.</p>
							<Button label="Manage 2FA" ghost compact class="self-start"/>
						</div>
					{/if}
					<div class="flex flex-col gap-3 border-t border-frame pt-4">
						<p class="text-sm font-medium text-canvas-contrast">Change password</p>
						<Field label="Current password">
							<Input type="password" placeholder="••••••••"/>
						</Field>
						<Field label="New password">
							<Input type="password" placeholder="••••••••"/>
						</Field>
						<Field label="Confirm new password">
							<Input type="password" placeholder="••••••••"/>
						</Field>
						<Button label="Update password" ghost compact class="self-start"/>
					</div>
					<div class="flex flex-col gap-3 border-t border-frame pt-4">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-canvas-contrast">Session timeout</p>
								<p class="text-xs text-muted-contrast">Auto-logout after {sessionTimeout} minutes of inactivity.</p>
							</div>
							<span class="text-sm font-mono text-accent">{sessionTimeout}min</span>
						</div>
						<Slider bind:value={sessionTimeout} min={5} max={120} step={5}/>
						<div class="flex justify-between text-xs text-muted-contrast"><span>5 min</span><span>120 min</span></div>
					</div>
				</Card>
			{/if}
		</div>
	</div>

	<!-- Footer -->
	<div class="px-6 py-4 border-t border-frame flex justify-end gap-2 shrink-0">
		<Button label="Cancel" ghost onclick={() => drawer.close()}/>
		<Button label="Save changes" icon={Save} accent onclick={save}/>
	</div>
</div>
