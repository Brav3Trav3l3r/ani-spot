<script>
	import { Twitch, Home, Search, Library } from 'lucide-svelte';
	import { Video } from '$lib/components';
</script>

<nav
	class="w-80 fixed left-0 top-0 bottom-[90px] text-white bg-black pt-8 flex flex-col justify-between "
>
	<div class="main px-6">
		<div class="icon flex items-center space-x-2">
			<div class="icon"><Twitch size="48" /></div>
			<h1 class="text-3xl font-semibold">Twitch</h1>
		</div>

		<div class="mainlinks mt-8 space-y-3 font-medium text-zinc-300 border-b-2 pb-4 border-zinc-800">
			<div class="home flex items-center space-x-4 w-fit cursor-pointer hover:text-white">
				<div class="icon">
					<Home size="28" />
				</div>
				<a href="/" class="">Home</a>
			</div>
			<div class="home flex items-center space-x-4 cursor-pointer w-fit hover:text-white">
				<div class="icon">
					<Search size="28" />
				</div>
				<a href="/search" class="">Search</a>
			</div>
			<div class="home flex items-center space-x-4 cursor-pointer w-fit hover:text-white">
				<div class="icon">
					<Library size="28" />
				</div>
				<a href="/library" class="">Library</a>
			</div>
		</div>
		<div class="secondary flex flex-col mt-4 text-sm  space-y-3 text-zinc-400">
			<a href="/" class="hover:text-white">Top 100</a>
			<a href="/" class="hover:text-white">Weekly Trending</a>
			<a href="/" class="hover:text-white">Most Watched</a>
			<a href="/" class="hover:text-white">Most Liked</a>
		</div>
	</div>

	<div class="video ">
		<Video />
	</div>
</nav>
