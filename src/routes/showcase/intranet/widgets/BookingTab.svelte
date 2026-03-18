<script lang="ts">
	import {Avatar, Button, ButtonBar, Card, Chip, ProgressBar, Tooltip, getModalManager} from "$lib";
	import {Building, Laptop, ParkingCircle, Plus} from "lucide-svelte";
	import BookingModal from "./BookingModal.svelte";

	const modal = getModalManager();

	type ResourceType = 'Meeting Room' | 'Equipment' | 'Parking';
	type Resource = {
		id: number;
		name: string;
		type: ResourceType;
		capacity?: number;
		features: string[];
		bookings: {from: string; to: string; by: string}[];
		available: boolean;
	};

	let filter = $state<ResourceType | 'all'>('all');

	const resources: Resource[] = [
		{
			id: 1, name: 'Boardroom A', type: 'Meeting Room', capacity: 12,
			features: ['Projector', 'Whiteboard', 'Video conf'],
			bookings: [
				{from: '09:00', to: '11:00', by: 'Elvis'},
				{from: '14:00', to: '15:30', by: 'Sarah Connor'},
			],
			available: false,
		},
		{
			id: 2, name: 'Focus Room B', type: 'Meeting Room', capacity: 4,
			features: ['TV Screen', 'Whiteboard'],
			bookings: [
				{from: '10:00', to: '10:30', by: 'Tom Reed'},
			],
			available: true,
		},
		{
			id: 3, name: 'Creative Hub', type: 'Meeting Room', capacity: 8,
			features: ['Dual screens', 'Sound system', 'Whiteboard'],
			bookings: [],
			available: true,
		},
		{
			id: 4, name: 'MacBook Pro 16"', type: 'Equipment',
			features: ['M3 Pro', '36GB RAM', '1TB SSD'],
			bookings: [{from: 'Today', to: 'Feb 5', by: 'Andras Kovacs'}],
			available: false,
		},
		{
			id: 5, name: 'Sony A7 IV Camera', type: 'Equipment',
			features: ['Full-frame', '33MP', 'Incl. 24-70mm lens'],
			bookings: [],
			available: true,
		},
		{
			id: 6, name: 'DJI Mic 2 Kit', type: 'Equipment',
			features: ['2-person wireless', 'Lavalier incl.'],
			bookings: [],
			available: true,
		},
		{
			id: 7, name: 'Spot A12', type: 'Parking',
			features: ['Underground', 'EV charging'],
			bookings: [{from: 'Today', to: 'Today', by: 'Laura Kim'}],
			available: false,
		},
		{
			id: 8, name: 'Spot B4', type: 'Parking',
			features: ['Ground floor', 'Covered'],
			bookings: [],
			available: true,
		},
	];

	const filtered = $derived(filter === 'all' ? resources : resources.filter(r => r.type === filter));

	const typeIcon = {
		'Meeting Room': Building,
		'Equipment': Laptop,
		'Parking': ParkingCircle,
	};

	function book(resource: Resource) {
		modal.open(BookingModal, {resource});
	}

	// Occupancy stats
	const rooms = resources.filter(r => r.type === 'Meeting Room');
	const roomOccupied = rooms.filter(r => !r.available).length;
</script>

<div class="flex flex-col gap-4">
	<!-- Stats + filter row -->
	<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
		<Card class="px-4 py-3 flex items-center gap-3 grow">
			<div class="flex flex-col">
				<span class="text-xs text-muted-contrast">Room occupancy today</span>
				<span class="text-sm font-semibold text-canvas-contrast">{roomOccupied}/{rooms.length} in use</span>
			</div>
			<div class="grow max-w-40">
				<ProgressBar value={(roomOccupied/rooms.length)*100} small/>
			</div>
		</Card>
		<ButtonBar compact>
			<Button label="All" {...filter === 'all' ? {accent: true} : {ghost: true}} compact onclick={() => filter = 'all'}/>
			<Button icon={Building} label="Rooms" {...filter === 'Meeting Room' ? {accent: true} : {ghost: true}} compact onclick={() => filter = 'Meeting Room'}/>
			<Button icon={Laptop} label="Equipment" {...filter === 'Equipment' ? {accent: true} : {ghost: true}} compact onclick={() => filter = 'Equipment'}/>
			<Button icon={ParkingCircle} label="Parking" {...filter === 'Parking' ? {accent: true} : {ghost: true}} compact onclick={() => filter = 'Parking'}/>
		</ButtonBar>
	</div>

	<!-- Resource grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each filtered as res (res.id)}
			{@const Icon = typeIcon[res.type]}
			<Card class="p-4 flex flex-col gap-3">
				<!-- Header -->
				<div class="flex items-start gap-3">
					<div class="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-contrast">
						<Icon size={18}/>
					</div>
					<div class="grow min-w-0">
						<p class="text-sm font-semibold text-canvas-contrast truncate">{res.name}</p>
						<div class="flex items-center gap-1.5 mt-0.5">
							<Chip color={res.available ? 'green' : 'red'}>{res.available ? 'Available' : 'In use'}</Chip>
							{#if res.capacity}
								<span class="text-xs text-muted-contrast">{res.capacity} seats</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Features -->
				<div class="flex gap-1 flex-wrap">
					{#each res.features as f}
						<Chip>{f}</Chip>
					{/each}
				</div>

				<!-- Today's bookings -->
				{#if res.bookings.length > 0}
					<div class="flex flex-col gap-1">
						<p class="text-xs text-muted-contrast">Today's bookings</p>
						{#each res.bookings as b}
							<div class="flex items-center gap-2 text-xs">
								<Tooltip label={b.by}>
									<Avatar name={b.by} micro/>
								</Tooltip>
								<span class="text-muted-contrast">{b.from} – {b.to}</span>
								<span class="text-canvas-contrast truncate">{b.by}</span>
							</div>
						{/each}
					</div>
				{/if}

				<Button
					icon={Plus}
					label={res.available ? 'Book now' : 'Book later'}
					{...res.available ? {accent: true} : {ghost: true}}
					compact
					class="mt-auto"
					onclick={() => book(res)}
				/>
			</Card>
		{/each}
	</div>
</div>
