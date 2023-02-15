<script>
	import { Maximize2 } from 'lucide-svelte';
	import { epId } from '$lib/store/store';
	let url;


	$: if ($epId !== null) {
		getUrl($epId.id).then((result) => {
			url = result;
		});
	}

	function search(key, array) {
		for (let n of array) {
			if (n.quality === key) {
				return n.url;
			}
		}
	}

	async function getUrl(id) {
		const res = await fetch(
			`https://cors.consumet.stream/https://api.consumet.org/meta/anilist/watch/${id}`
		);
		const data = await res.json();
		const sources = data.sources;
		const promise = await search('default', sources);
		return promise;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/base.min.css" />
	<!-- the following styles are optional - remove to go headless -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/ui/buttons.min.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/ui/sliders.min.css" />
	<script type="module" src="https://cdn.jsdelivr.net/npm/vidstack/dist/cdn/prod.js"></script>
</svelte:head>

<div class="video aspect-video w-full bg-zinc-800 relative group focus:outline-none">
	{#if url}
		<div class="player h-full w-full object-cover aspect-video focus:outline-none">
			<!-- remove `controls` attribute if you're designing a custom UI -->
			<media-player src={url} controls autoplay>
				<media-outlet />
			</media-player>
		</div>
	{:else}
		<div class="image">
			<img
				src="https://artworks.thetvdb.com/banners/series/377543/episodes/5fa45daa51da3.jpg"
				alt=""
				class="h-full w-full object-cover "
			/>
		</div>
	{/if}
	<div
		class="icon absolute top-2 right-2 hidden group-hover:block cursor-pointer p-3 rounded-full aspect-square bg-black/50"
	>
		<Maximize2 size="20" />
	</div>
</div>
