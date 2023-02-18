<script>
	import { Featured, AnimeGroup } from '$lib/components';
	import {Play} from 'lucide-svelte'
	export let data;
	let { trend, recent, popular } = data;
	$: recent = recent.results;
	$: popular = popular.results;
	$: trend = trend.results;
</script>

<div class="home pt-16">
	<!-- <Featured /> -->
	<div class="popluar px-8 py-6 ">
		<h1 class="text-2xl font-semibold tracking-tight pb-8">Popular</h1>
		<div class="grid grid-cols-3 gap-4">
			{#each popular as anime}
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
	<AnimeGroup data={trend} title="Trending" />
	<AnimeGroup data={recent} title="Recent Releases" />

</div>
