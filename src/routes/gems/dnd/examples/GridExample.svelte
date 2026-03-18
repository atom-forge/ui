<script lang="ts">
    import SortableList from "$lib/gems/dnd/SortableList.svelte";

    type FileItem = { id: string; name: string; ext: string; size: string };

    let files = $state<FileItem[]>([
        { id: "1", name: "avatar", ext: "png", size: "24 KB" },
        { id: "2", name: "logo", ext: "svg", size: "4 KB" },
        { id: "3", name: "report-q1", ext: "pdf", size: "1.2 MB" },
        { id: "4", name: "index", ext: "html", size: "8 KB" },
        { id: "5", name: "styles", ext: "css", size: "16 KB" },
        { id: "6", name: "main", ext: "ts", size: "12 KB" },
        { id: "7", name: "data", ext: "json", size: "3 KB" },
        { id: "8", name: "background", ext: "jpg", size: "640 KB" },
        { id: "9", name: "notes", ext: "md", size: "2 KB" },
        { id: "10", name: "presentation", ext: "pptx", size: "5.4 MB" },
        { id: "11", name: "spreadsheet", ext: "xlsx", size: "220 KB" },
        { id: "12", name: "config", ext: "yaml", size: "1 KB" },
    ]);

    const extColors: Record<string, string> = {
        png: "bg-blue-500/15 text-blue-400",
        svg: "bg-violet-500/15 text-violet-400",
        pdf: "bg-red-500/15 text-red-400",
        html: "bg-orange-500/15 text-orange-400",
        css: "bg-cyan-500/15 text-cyan-400",
        ts: "bg-blue-500/15 text-blue-300",
        json: "bg-yellow-500/15 text-yellow-400",
        jpg: "bg-green-500/15 text-green-400",
        md: "bg-stone-500/15 text-stone-400",
        pptx: "bg-orange-500/15 text-orange-300",
        xlsx: "bg-emerald-500/15 text-emerald-400",
        yaml: "bg-pink-500/15 text-pink-400",
    };
</script>

<SortableList
    bind:items={files}
    id="grid-example"
    orientation="grid"
    class="gap-3"
>
    {#snippet item(file)}
        <div
            class="w-32 flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary border border-frame cursor-grab active:cursor-grabbing select-none hover:border-accent/50 transition-colors"
        >
            <div
                class={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold uppercase ${extColors[file.ext] ?? "bg-secondary-c/10 text-canvas-contrast"}`}
            >
                {file.ext}
            </div>
            <span class="text-xs text-canvas-contrast text-center leading-tight truncate w-full"
                >{file.name}.{file.ext}</span
            >
            <span class="text-xs text-muted-contrast">{file.size}</span>
        </div>
    {/snippet}
</SortableList>
