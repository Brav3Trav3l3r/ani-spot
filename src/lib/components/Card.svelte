<script>
	export let anime;
	
</script>

{#if anime.id}
	
	<a href="/{anime.id}"
		><div class="anime flex flex-col space-y-4 hover:bg-zinc-800/70 bg-[#181818] rounded-xl p-4 w-52 h-90 rounded-medium truncate border-4 border-[#121212]">
			<div class="image aspect-[2/3] w-full rounded-md truncate">
				<img src={anime.image} alt="" class="h-full w-full object-cover" />
			</div>
			<div class="titles ">
				<h1 class="line-clamp-1">
					{anime.title.english ? anime.title.english : anime.title.romaji}
				</h1>
				<div class="group flex space-x-2 text-sm text-zinc-400">
					<h1>{anime.rating}%</h1>
					<h1>{anime.type}</h1>
				</div>
			</div>
		</div></a
	>
	
{/if}