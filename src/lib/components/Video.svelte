<script>
	import { Maximize2 } from 'lucide-svelte';
	import { defineCustomElements } from 'vidstack/elements';
	import 'vidstack/styles/base.css';
	import 'vidstack/styles/ui/buttons.css';
	import 'vidstack/styles/ui/sliders.css';

	defineCustomElements();

	export let epId;
	let url;

	$: if (epId !== null) {
		getUrl(epId.id).then((result) => {
			url = result;
		});
	}

	function search(key, array) {
		if (array != null) {
			for (let n of array) {
				if (n.quality === key) {
					return n.url;
				}
			}
		}
	}

	async function getUrl(id) {
		if (id != null) {
			const res = await fetch(`https://api-consumet-rust.vercel.app/meta/anilist/watch/${id}`);
			const data = await res.json();
			const sources = await data.sources;
			const promise = await search('default', sources);
			return promise;
		}
	}
</script>

<div class="video aspect-video w-full bg-zinc-800 relative group focus:outline-none ">
	<!-- {#await getUrl()}
		<div class="skeleton h-full w-full object-cover aspect-video focus:outline-none ">
			<img
				src="https://cdn.dribbble.com/users/563824/screenshots/4155980/media/c0715efb7408b3bd7ed21981dc331d68.gif"
				alt=""
				class="w-full h-full object-cover"
			/>
		</div>
	{:then} -->
	<div class="player h-full w-full object-cover aspect-video focus:outline-none ">
		<media-player src={url} controls autoplay>
			<media-outlet />
		</media-player>
	</div>

	<div
		class="icon absolute top-2 right-2 hidden group-hover:block cursor-pointer p-3 rounded-full aspect-square bg-black/50"
	>
		<Maximize2 size="20" />
	</div>
	<!-- {/await} -->
</div>
