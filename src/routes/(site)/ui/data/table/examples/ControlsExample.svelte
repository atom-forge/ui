<script lang="ts">
    import { Table, type ColumnDef } from '@atom-forge/ui';

    type Ticket = { id: number; summary: string; owner: string };
    const data: Ticket[] = [
        { id: 1, summary: 'Audit public exports, sources and types against installed 0.0.34', owner: 'Alice' },
        { id: 2, summary: 'Update live examples and displayed source', owner: 'Bob' },
    ];
    let columns = $state<ColumnDef<Ticket>[]>([
        { key: 'id', label: 'ID', fixed: true, width: '4rem' },
        { key: 'summary', label: 'Summary', grow: true, minWidth: '10rem', overflow: 'wrap' },
        { key: 'owner', label: 'Owner', width: '6rem', maxWidth: '8rem', overflow: 'clip' },
    ]);
    let selected = $state('Select a row with the pointer or keyboard. Columns fit without horizontal scrolling.');
</script>

<div class="space-y-3">
    <Table {data} bind:columns frameless noScroll layout="auto" overflow="ellipsis"
        headerClass="text-accent" rowClick={(row, _, index, event) => {
            selected = `Ticket ${row.id}, row ${index}, via ${event.type}`;
        }}
    />
    <p aria-live="polite" class="text-sm text-muted-contrast">{selected}</p>
</div>
