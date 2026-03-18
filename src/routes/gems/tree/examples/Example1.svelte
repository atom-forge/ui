<script lang="ts">
	import { TreeView } from "$lib";
	import {File, Folder, Music, Image as Photo} from "lucide-svelte";

	const treeData = [
		{
			id: '1',
			label: 'Documents',
			icon: Folder,
			children: [
				{id: '2', label: 'report.docx', icon: File},
				{id: '3', label: 'presentation.pptx', icon: File},
			]
		},
		{
			id: '4',
			label: 'Media',
			icon: Folder,
			children: [
				{
					id: '5',
					label: 'Images',
					icon: Photo,
					children: [
						{id: '6', label: 'vacation.jpg', icon: Photo},
						{id: '7', label: 'logo.png', icon: Photo},
					]
				},
				{
					id: '8',
					label: 'Music',
					icon: Music,
					children: [
						{id: '9', label: 'track1.mp3', icon: Music},
					]
				}
			]
		}
	];
</script>

<TreeView data={treeData}/>
