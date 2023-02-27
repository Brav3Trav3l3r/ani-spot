<script>
	import { Heart } from 'lucide-svelte';
</script>

<div class="featured relative h-[350px] w-full flex items-end ">
	<div class="cover absolute inset-0 z-0">
		<img
			src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/116674-l2YlIyJzvGSV.jpg"
			alt="artbleach"
			class="h-full w-full object-cover"
		/>
	</div>

	<div class="bg-gradient-to-t from-zinc-900/70 absolute bottom-0 h-56 inset-x-0 z-10" />

	<div class="info flex flex-col pb-8 justify-end h-80 ml-10 z-20">
		<div class="detai flex space-x-2 text-sm font-semibold text-gray-200 ">
			<h1>Oct 2022</h1>
			<h1>|</h1>
			<h1>Action Drama Adventure</h1>
		</div>
		<div class="title text-4xl md:text-5xl lg:text-6xl xl:text-6xl line-clamp-2 font-bold mt-2">
			<h1>Bleach Thousand Year Blood War</h1>
		</div>
		<div class="buttons flex z-10 space-x-6 items-center mt-8">
			<a href="/116674"
				><button
					class="px-20 shadow font-bold py-1.5 bg-gradient-to-r from-violet-500 via-purple-400 active:scale-95 transform duration-150 to-purple-300 rounded-full text-[#121212] tracking-wider"
					>Play</button
				></a
			>
			<button class="text-white/40"><Heart size="28" /></button>
		</div>
	</div>
</div>
