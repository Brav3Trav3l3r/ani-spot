<script>
	import { Player, Hls } from '@vime/svelte';
	import { Maximize2 } from 'lucide-svelte';
	import { epId } from '$lib/store/store';
	let url;

	const hlsConfig = {
		// ...
	};

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

<div class="video aspect-video w-full bg-zinc-800 relative group focus:outline-none">
	<div class="player h-full w-full object-cover aspect-video focus:outline-none">

		<Player controls autoplay>
			<Hls version="latest" config="{hlsConfig}">
				<source data-src={url} type="application/x-mpegURL" />
			  </Hls>
		</Player>
	</div>

	<div
		class="icon absolute top-2 right-2 hidden group-hover:block cursor-pointer p-3 rounded-full aspect-square bg-black/50"
	>
		<Maximize2 size="20" />
	</div>
</div>
