<script>
	export let anime;
	export let recentEpisode = false
	$: animeTitle = anime.title.english ? anime.title.english : anime.title.romaji
	
</script>

{#if anime.id}
	
	<a href="/{anime.id}"
		><div class="anime flex flex-col space-y-4 hover:bg-zinc-800/70 bg-[#181818] rounded-xl p-4 w-56 h-[400px] rounded-medium border-4 border-[#121212]">
			<div class="image aspect-[2/3] w-full rounded-md truncate relative">
				<img src={anime.image} alt="" class="h-full w-full object-cover" />
				{#if recentEpisode}
					<div class="absolute px-3 py-1 top-2 flex items-center justify-center right-2 rounded-md bg-purple-400 ">
						<h1 class="text-purple-700 font-medium">ep {anime.episodeNumber}</h1>
					</div>
				{/if}
			</div>
			<div class="titles flex flex-col justify-between flex-1">
				<h1 class="line-clamp-2 overflow-scroll">
					{animeTitle}
				</h1>
				<div class="group flex space-x-2 text-sm text-zinc-400">
					<h1>{anime.rating}%</h1>
					<h1>{anime.type}</h1>
				</div>
			</div>
		</div></a
	>
	
{/if}