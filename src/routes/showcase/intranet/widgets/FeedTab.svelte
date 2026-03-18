<script lang="ts">
	import {Avatar, AvatarGroup, Button, Card, Chip, Collapsible, Input, Tooltip, getToastManager, Field} from "$lib";
	import {Bookmark, MessageCircle, Image as Photo, Send, ThumbsUp} from "lucide-svelte";

	const toast = getToastManager();

	type Post = {
		id: number;
		author: string;
		role: string;
		time: string;
		category: 'announcement' | 'event' | 'general' | 'it';
		content: string;
		likes: number;
		liked: boolean;
		saved: boolean;
		comments: {author: string; text: string}[];
	};

	const categoryMeta = {
		announcement: {color: 'blue' as const,   label: 'Announcement'},
		event:        {color: 'green' as const,  label: 'Event'},
		general:      {color: 'base' as const,   label: 'General'},
		it:           {color: 'yellow' as const, label: 'IT'},
	};

	let newPost = $state('');

	let posts = $state<Post[]>([
		{
			id: 1, author: 'Sarah Connor', role: 'HR Manager',
			time: '10 minutes ago', category: 'announcement',
			content: '🎉 We\'re thrilled to announce that we\'ve been awarded "Best Workplace 2025"! This is a testament to every single one of you. Celebration drinks in the kitchen at 17:00 today!',
			likes: 42, liked: false, saved: false,
			comments: [
				{author: 'John Martinez', text: 'Amazing news! Well deserved 🏆'},
				{author: 'Laura Kim', text: 'See you all at 5! 🥂'},
			]
		},
		{
			id: 2, author: 'Tom Reed', role: 'Office Manager',
			time: '2 hours ago', category: 'event',
			content: 'Q1 Team Offsite dates are confirmed: February 12–14 at Mountain Lodge, Mátrafüred. Transport departs from the office at 08:00. Please RSVP by Friday so we can finalize catering. 🏔️',
			likes: 18, liked: false, saved: false,
			comments: [
				{author: 'Andras Kovacs', text: 'Looking forward to it!'},
			]
		},
		{
			id: 3, author: 'IT Helpdesk', role: 'IT Department',
			time: 'Yesterday', category: 'it',
			content: '⚠️ Scheduled maintenance this Sunday 02:00–04:00 UTC. The VPN, internal wiki, and CI/CD pipelines will be unavailable. Please plan accordingly and save your work before Sunday.',
			likes: 7, liked: false, saved: false,
			comments: []
		},
		{
			id: 4, author: 'Elvis', role: 'Engineering Lead',
			time: '2 days ago', category: 'general',
			content: 'Just shipped AtomForge v2.1 🚀 Highlights: dark mode improvements, 40% faster initial load, CSV export on all tables, and a new FlipCard component. Changelog is in the docs repo.',
			likes: 31, liked: false, saved: true,
			comments: [
				{author: 'Sarah Connor', text: 'The FlipCard is so cool!'},
				{author: 'Tom Reed', text: 'CSV export was on my wishlist for months, thank you!'},
				{author: 'John Martinez', text: 'Dark mode looks great 👏'},
			]
		},
	]);

	const inOffice = ['Sarah Connor', 'Tom Reed', 'Elvis', 'Laura Kim'];
	const remote = ['John Martinez', 'Andras Kovacs'];

	function toggleLike(id: number) {
		posts = posts.map(p => p.id === id ? {...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1} : p);
	}

	function toggleSave(id: number) {
		const post = posts.find(p => p.id === id)!;
		posts = posts.map(p => p.id === id ? {...p, saved: !p.saved} : p);
		toast.show(post.saved ? 'Removed from saved' : 'Post saved!');
	}

	function submitPost() {
		if (!newPost.trim()) return;
		const post: Post = {
			id: Date.now(), author: 'Elvis', role: 'Engineering Lead',
			time: 'Just now', category: 'general',
			content: newPost.trim(), likes: 0, liked: false, saved: false, comments: [],
		};
		posts = [post, ...posts];
		newPost = '';
		toast.show('Post published!', {type: 'success'});
	}
</script>

<div class="flex flex-col lg:flex-row gap-6">
	<!-- Feed -->
	<div class="flex flex-col gap-4 grow min-w-0">
		<!-- Composer -->
		<Card class="p-4 flex gap-3 items-start">
			<Avatar name="Elvis"/>
			<div class="grow flex flex-col gap-2">
				<Field label="What's on your mind, Elvis?" class="w-full">
					<Input bind:value={newPost}/>
				</Field>
				<div class="flex items-center justify-between">
					<div class="flex gap-1">
						<Button icon={Photo} ghost compact label="Photo"/>
					</div>
					<Button icon={Send} label="Post" accent compact onclick={submitPost}/>
				</div>
			</div>
		</Card>

		<!-- Posts -->
		{#each posts as post (post.id)}
			{@const meta = categoryMeta[post.category]}
			<Card class="p-5 flex flex-col gap-3">
				<!-- Header -->
				<div class="flex items-start gap-3">
					<Avatar name={post.author}/>
					<div class="grow">
						<div class="flex items-center gap-2 flex-wrap">
							<span class="text-sm font-semibold text-canvas-contrast">{post.author}</span>
							<Chip color={meta.color}>{meta.label}</Chip>
						</div>
						<p class="text-xs text-muted-contrast">{post.role} · {post.time}</p>
					</div>
					<Tooltip label={post.saved ? 'Unsave' : 'Save post'}>
						<Button
							icon={Bookmark}
							ghost micro
							class={post.saved ? 'text-accent' : ''}
							onclick={() => toggleSave(post.id)}
						/>
					</Tooltip>
				</div>

				<!-- Content -->
				<p class="text-sm text-canvas-contrast leading-relaxed">{post.content}</p>

				<!-- Actions -->
				<div class="flex items-center gap-1 pt-1 border-t border-frame">
					<Button
						icon={ThumbsUp}
						label={String(post.likes)}
						ghost compact
						class={post.liked ? 'text-accent' : ''}
						onclick={() => toggleLike(post.id)}
					/>
					<Button icon={MessageCircle} label={String(post.comments.length)} ghost compact/>
				</div>

				<!-- Comments -->
				{#if post.comments.length > 0}
					<Collapsible title="Comments ({post.comments.length})" small>
						<div class="flex flex-col gap-2 p-3">
							{#each post.comments as c}
								<div class="flex items-start gap-2">
									<Avatar name={c.author} small/>
									<div class="bg-secondary rounded-lg px-3 py-1.5 text-xs text-canvas-contrast grow">
										<span class="font-medium">{c.author}</span> · {c.text}
									</div>
								</div>
							{/each}
						</div>
					</Collapsible>
				{/if}
			</Card>
		{/each}
	</div>

	<!-- Sidebar -->
	<div class="lg:w-56 shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
		<Card class="p-4 flex flex-col gap-3 flex-1">
			<h3 class="text-xs font-semibold text-muted-contrast uppercase tracking-wider">In Office Today</h3>
			<div class="flex flex-col gap-2">
				{#each inOffice as name}
					<div class="flex items-center gap-2">
						<Avatar {name} compact/>
						<span class="text-sm text-canvas-contrast">{name}</span>
						<span class="ml-auto w-2 h-2 rounded-full bg-green-400 shrink-0"></span>
					</div>
				{/each}
			</div>
			<h3 class="text-xs font-semibold text-muted-contrast uppercase tracking-wider mt-1">Remote</h3>
			<div class="flex flex-col gap-2">
				{#each remote as name}
					<div class="flex items-center gap-2">
						<Avatar {name} compact/>
						<span class="text-sm text-canvas-contrast">{name}</span>
						<span class="ml-auto w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
					</div>
				{/each}
			</div>
		</Card>

		<Card class="p-4 flex flex-col gap-2">
			<h3 class="text-xs font-semibold text-muted-contrast uppercase tracking-wider">Upcoming</h3>
			{#each [
				{date: 'Feb 12', label: 'Team Offsite', color: 'bg-green-400'},
				{date: 'Feb 14', label: "Valentine's WFH", color: 'bg-pink-400'},
				{date: 'Feb 28', label: 'Q1 Review', color: 'bg-blue-400'},
			] as ev}
				<div class="flex items-center gap-2 text-sm">
					<div class="w-2 h-2 rounded-full {ev.color} shrink-0"></div>
					<span class="text-muted-contrast text-xs w-10 shrink-0">{ev.date}</span>
					<span class="text-canvas-contrast truncate">{ev.label}</span>
				</div>
			{/each}
		</Card>
	</div>
</div>
