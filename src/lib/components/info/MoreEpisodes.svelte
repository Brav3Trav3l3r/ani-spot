<script>
	import { fly, scale } from 'svelte/transition';
	import { epId } from '$lib/store/boolean';
	import { isOpen } from '../../store/boolean';
	import { quintOut } from 'svelte/easing';
	import { X } from 'lucide-svelte';
	export let info;
</script>

<main
	in:fly={{ y: 500, duration: 200, easing: quintOut }}
	class=" eps fixed overflow-auto bottom-20 right-0 left-80 top-0 bg-[#121212] pt-16 px-8 z-50"
>
	<div in:fly={{ y: 50, duration: 400, delay: 100, easing: quintOut }} class="playing mt-8">
		<h1 class="text-zinc-400 font-medium mb-2">Now Playing</h1>
		<div class="list mt-2">
			<div
				class="episode flex items-center  hover:bg-zinc-400/10 rounded-md py-2 px-4 cursor-pointer text-purple-400"
			>
				<h1 class=" ">1</h1>
				<div class="image h-14 ml-6 mr-4 aspect-video ">
					<img src={info.episodes[0].image} alt="" class="w-full h-full object-cover" />
				</div>
				<h1 class="">{info.episodes[0].title}</h1>
			</div>
		</div>
	</div>

	<div in:fly={{ y: 50, duration: 400, delay: 150, easing: quintOut }} class="episodeslist mt-8">
		<h1 class="text-zinc-400 font-medium mb-2">Episodes</h1>
		<div class="list pb-6">
			{#each info.episodes as episode}
				<div
					on:keydown
					on:click={() => epId.set(episode.id)}
					class="episode flex items-center hover:bg-zinc-800/30 rounded-md py-2 px-4 cursor-pointer "
				>
					<h1 class="text-zinc-400">{episode.number}</h1>
					<div class="image h-14 ml-6 mr-4 aspect-video bg-zinc-800 shrink-0">
						<img src={episode.image} alt="" class="w-full h-full object-cover" />
					</div>
					<h1 class="text-zinc-100">{episode.title != null ? episode.title : ''}</h1>
				</div>
			{/each}
		</div>
	</div>
</main>
<div
	on:keydown
	on:click
	in:scale={{ duration: 300 }}
	class="button fixed bottom-28 h-fit right-14 cursor-pointer z-50 rounded-full bg-purple-400 p-2"
>
	<div><X fill="purple" size="24" /></div>
</div>
