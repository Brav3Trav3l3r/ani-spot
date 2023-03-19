<script>
	import { Featured, AnimeGroup } from '$lib/components';
	import {Play} from 'lucide-svelte'
	export let data;
	let { trend, recent, popular } = data;
	$: recent = recent.results;
	$: popular = popular.results;
	$: trend = trend.results;
	import {page} from '$app/stores'
</script>

<Featured />
<div class="home py-10 px-8 space-y-8">
	{#if $page.data.session}
		<div class="continue-watch">
			<h1 class="text-2xl font-semibold tracking-tight pb-8">Continue Watching</h1>
			<div class="grid grid-cols-3 gap-x-6 gap-y-4">
				{#each popular.slice(0,6) as anime}
					<a href="/{anime.id}"
						><div
							class="card group relative h-20 flex items-center space-x-4 bg-zinc-500/20 hover:bg-zinc-500/30 rounded truncate"
						>
							<div class="image aspect-square h-full drop-shadow-xl">
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
							<div class="play bg-purple-400 p-3 drop-shadow-xl rounded-full group-hover:flex items-center justify-center mr-auto absolute right-4 hidden ">
								<div class="icon translate-x-0.5">
									<Play fill="black" size="24" strokeWidth="0" />
								</div>
							</div>
						</div></a
					>
				{/each}
			</div>
		</div>
	{/if}
	<AnimeGroup data={trend} title="Trending" />
	
	<AnimeGroup data={recent} recentEpisode = {true} title="Recent Releases" />
	<AnimeGroup data={popular} title="Popular" />

</div>
