<script>
	import { epId } from '$lib/store/boolean';
	import { ArrowLeftRight, Heart } from 'lucide-svelte';
	export let info;
	let aniImage = 'https://s4.anilist.co/file/anilistcdn/character/large/default.jpg';
	let defImage = 'https://wallpapercave.com/wp/wp9238698.jpg';

	import { Card } from '$lib/components';
</script>

<div class="group1 flex w-full px-8 py-2 pb-6 space-x-4">
	<div class="episodes w-3/5">
		<h1 class="text-2xl font-semibold tracking-tight">Episodes</h1>
		{#if info.episodes.length > 0}
			<div class="table-list mt-4">
				{#each info.episodes.slice(0, 5) as episode}
					<div
						on:keydown
						on:click={() => epId.set(episode.id)}
						class="episode flex items-center hover:bg-zinc-100/10 rounded-md py-2 px-4 cursor-pointer"
					>
						<h1 class="text-zinc-400 font-semibold ">{episode.number}</h1>
						<div class="image brightness-95 h-14 ml-6 mr-4 aspect-video truncate shrink-0">
							<img src={episode.image} alt="" class="w-full h-full object-cover" />
						</div>
						<h1 class="text-zinc-100 max-w-md line-clamp-1">{episode.title != null ? episode.title : ''}</h1>
					</div>
				{/each}
			</div>

			<button
				on:click
				class="text-sm font-semibold text-[#B2B2B2] hover:underline w-fit underline-offset-2 cursor-pointer mt-4"
				>{#if info.episodes.length > 0 && info.nextAiringEpisode && info.nextAiringEpisode.episode <= info.episodes.length}
					{info.nextAiringEpisode.episode - 1}/{info.episodes.lenght}
				{:else if info.episodes.length}
					{info.episodes.length}
				{/if}
				<span>EPISODES</span></button
			>
		{:else}
			<div class="no-eps py-4">
				<h1 class="text-lg  text-zinc-400 ">No episode available</h1>
			</div>
		{/if}
	</div>
	<div class="info w-2/5">
		<h1 class="text-2xl font-semibold tracking-tight">Info</h1>
		<div class="flex mt-4 space-x-4">
			<div class="image rounded w-36 brightness-95 aspect-[2/3] truncate shrink-0">
				<img src={info.image} alt="" class="w-full h-full object-cover" />
			</div>
			<div class="group space-y-1">
				<h1 class="text-xl font-semibold">
					{info.title.english ? info.title.english : info.title.romaji}
				</h1>
				<div class="a1 text-zinc-400 flex space-x-2 text-sm font-medium">
					<h1 class="">{info.type}</h1>
					<h1>|</h1>
					<h1>{info.duration} minutes</h1>
				</div>
				<h1 class={`${info.status === 'Completed' ? 'text-red-500' : 'text-green-500'}`}>
					{info.status}
				</h1>
				<!-- <h1><span>next release:</span> </h1> -->
				{#if info.nextAiringEpisode}
					<div class="airing text-zinc-400">
						<h1>
							{`ep ${info.nextAiringEpisode.episode} will air in ${
								info.nextAiringEpisode.timeUntilAiring / 86400
							} `}
						</h1>
					</div>
				{/if}
				<div class="group2 flex items-center space-x-8 ">
					<div class="popularity flex space-x-2">
						<div class="icon rotate-90">
							<ArrowLeftRight color="yellow" />
						</div>
						<h1 class="text-lg ">{info.popularity}</h1>
					</div>
					<div class="score flex items-center space-x-2">
						<div class="icon">
							<Heart strokeWidth="0" fill="red" />
						</div>
						<h1 class="text-lg">{info.rating} %</h1>
					</div>
				</div>
			</div>
		</div>

		<p class=" line-clamp-5 mt-4 text-sm text-zinc-400">{@html info.description}</p>
	</div>
</div>

{#if info.relations.length > 0}
	<div class="relations p-8">
		<div class="heading flex justify-between items-center">
			<h1 class="text-2xl font-semibold tracking-tight py-4 ">Relations</h1>
			<h1
				class="text-sm font-semibold text-[#B2B2B2] hover:underline w-fit underline-offset-2 cursor-pointer"
			>
				SHOW ALL
			</h1>
		</div>
		<div class="card-group flex overflow-auto gap-6 scrollbar-hide">
			{#each info.relations as anime}
				<Card {anime} />
			{/each}
		</div>
	</div>
{/if}

{#if info.characters.length > 0}
	<div class="characters px-8">
		<div class="heading flex justify-between items-center ">
			<h1 class="text-2xl font-semibold tracking-tight py-4 ">Characteres</h1>
			<h1
				class="text-sm font-semibold text-[#B2B2B2] hover:underline w-fit underline-offset-2 cursor-pointer"
			>
				SHOW ALL
			</h1>
		</div>
		<div class="characteres flex overflow-auto gap-6 scrollbar-hide">
			{#each info.characters as ch}
				<div
					class="anime flex flex-col space-y-4 hover:bg-zinc-800/70 bg-[#181818] rounded-lg p-6 w-52 h-90 rounded-medium shrink-0 text-center"
				>
					<div class="image aspect-square w-full rounded-full truncate">
						<img src={ch.image} alt="" class="h-full w-full object-cover" />
					</div>
					<div class="titles ">
						<h1 class="line-clamp-1">
							{ch.name.userPreferred ? ch.name.userPreferred : ch.name.full}
						</h1>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

{#if info.recommendations.length > 0}
	<div class="recomendations p-8">
		<div class="heading flex justify-between items-center">
			<h1 class="text-2xl font-semibold tracking-tight py-4 ">Recomendations</h1>
			<h1
				class="text-sm font-semibold text-[#B2B2B2] hover:underline w-fit underline-offset-2 cursor-pointer"
			>
				SHOW ALL
			</h1>
		</div>
		<div class="card-group flex overflow-auto gap-6 scrollbar-hide">
			{#each info.recommendations as anime}
				<Card {anime} />
			{/each}
		</div>
	</div>
{/if}
