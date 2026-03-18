<script lang="ts">
	import {type ColumnDef, Table} from '$lib';

	type User = {
		id: number;
		name: string;
		email: string;
		role: 'Admin' | 'Editor' | 'Viewer';
		status: 'Active' | 'Inactive';
		lastLogin: Date;
	};

	// Generate more data to demonstrate scrolling
	const data: User[] = Array.from({length: 25}, (_, i) => {
		const roles: User['role'][] = ['Admin', 'Editor', 'Viewer'];
		const statuses: User['status'][] = ['Active', 'Inactive'];
		return {
			id: i + 1,
			name: `User ${i + 1}`,
			email: `user${i + 1}@example.com`,
			role: roles[i % roles.length],
			status: statuses[i % statuses.length],
			lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000)
		};
	});

	const columns = $state<ColumnDef<User>[]>([
		{key: 'id', label: 'ID', fixed: true},
		{key: 'name', label: 'Name', fixed: true},
		{key: 'email', label: 'Email'},
		{
			key: 'role',
			label: 'Role',
			style: { cell: (row) => row.role === 'Admin' ? 'font-bold text-purple-600' : 'font-medium' }
		},
		{
			key: 'status',
			label: 'Status',
			snippet: statusSnippet
		},
		{
			key: 'lastLogin',
			label: 'Last Login',
			visible: false,
			formatter: (row) => row.lastLogin.toLocaleDateString()
		}
	]);
</script>

{#snippet statusSnippet(row:User)}
	<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
		{row.status}
	</span>
{/snippet}

<div class="h-96">
	<Table {data} {columns} class="h-full"/>
</div>
