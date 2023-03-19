<script>
	import { Twitch, Home, Search, Library } from 'lucide-svelte';
	import { storeAnime, epId } from '$lib/store/store.js';
	import { fly, scale } from 'svelte/transition';
</script>

<nav class="w-80 fixed left-0 top-0 bottom-0 text-white bg-black flex flex-col justify-between ">
	<div class="main px-4">
		<div
			class="mainlinks mt-8 space-y-3 text-sm font-medium text-zinc-300 border-b-2 pb-4 border-zinc-800"
		>
			<div class="home flex items-center space-x-4 w-fit cursor-pointer hover:text-white">
				<div class="icon">
					<Home />
				</div>
				<a href="/" class="">Home</a>
			</div>
			<div class="home flex items-center space-x-4 cursor-pointer w-fit hover:text-white">
				<div class="icon">
					<Search />
				</div>
				<a href="/search" class="">Search</a>
			</div>
			<div class="home flex items-center space-x-4 cursor-pointer w-fit hover:text-white">
				<div class="icon">
					<Library />
				</div>
				<a href="/library" class="">Library</a>
			</div>
		</div>
		<div class="secondary flex flex-col mt-4 text-sm  space-y-3 text-zinc-400">
			<a href="/" class="hover:text-white">Top 100</a>
			<a href="/" class="hover:text-white">Weekly Trending</a>
			<a href="/" class="hover:text-white">Most Watched</a>
		</div>
	</div>
	
</nav>
