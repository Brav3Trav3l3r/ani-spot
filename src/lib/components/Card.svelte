<script>
	export let anime;
	export let recentEpisode = false;
	$: animeTitle = anime.title.english ? anime.title.english : anime.title.romaji;
	import { isDubbed, provider } from '$lib/store/media.js';
	import { Mic, Percent } from 'lucide-svelte';
</script>

{#if anime.id}
	<a href="/{anime.id}?dub={$isDubbed}&provider={$provider}">
		<div class="card flex flex-col relative border border-black hover:border-purple-500/10 shadow-xl transition hover:shadow-purple-500/10">
			<div class=" image aspect-[2/3] flex-1 overflow-hidden">
				<img src={anime.image} alt={animeTitle} class="w-full h-full object-cover" />
			</div>
			<div class="w-full bg-[#181818] h-10" />
			<div
				class="w-full absolute bottom-10 inset-x-0 h-40 bg-gradient-to-t from-[#181818] to-[#181818]/0"
			/>
			<div class="w-full space-y-2 absolute bottom-0 inset-x-0 h-40 flex flex-col justify-end p-2">
				<div class="title ">
					<h1 class="text-[#FEFEDF]">{animeTitle}</h1>
				</div>
				<div class="info flex justify-between">
					<h1 class="text-md  text-zinc-400">
						<span class="font-bold font-roboto text-md">{(anime.episodes || anime.totalEpisodes ) ? (anime?.episodes ?? anime.totalEpisodes  ) : (anime.episodeNumber || '?')}</span>
						<span class="text-sm ml-1 text-zinc-500">eps</span>
					</h1>
					{#if anime.rating}
						<div class="rating flex items-center text-md gap-1 font-bold text-green-500/90">
							<h1 class="font-roboto">{anime.rating}</h1>
							<Percent size="16" />
						</div>
					{/if}
				</div>
			</div>
			{#if recentEpisode}
				<div
					class="absolute px-3 py-1 top-2 flex items-center justify-center right-0 bg-[#006E5E] border-l-4 border-[#181818]"
				>
					<h1 class="text-[#FEFEDF] font-roboto font-bold text-md">{anime.episodeNumber}<span class="text-sm ml-1 text-[#181818]">eps</span></h1>
				</div>
			{/if}
		</div>
	</a>
{/if}
