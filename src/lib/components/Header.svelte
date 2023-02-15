<script>
	import { Play } from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
	import { ChevronLeft, ChevronRight, Triangle } from 'lucide-svelte';
	import profile from '../../assets/eren.png';
	import { page } from '$app/stores';
	import { isOpen } from '../store/boolean';
	import { afterNavigate } from '$app/navigation';
	export let yScroll;
	let color;

	afterNavigate(() => {
		if ($page.data.color) {
			color = $page.data.color;
		} else {
			color = 'black';
		}
	});
</script>

<div
	class="header h-16 fixed left-80 right-0 text-white top-0 z-50"
	style:background-color={$isOpen || yScroll > 264 ? color : 'transparent'}
>
	<div class="interact relative items-center flex px-8  z-10 h-full w-full">
		<div class="arrows flex space-x-2 ">
			<div class="left-arrow bg-black/80 p-1 rounded-full cursor-pointer">
				<ChevronLeft color="#d1d1d1" size="28" strokeWidth="1" />
			</div>
			<div class="right-arrow bg-black/80 p-1 rounded-full cursor-pointer ">
				<ChevronRight color="#d1d1d1" size="28" strokeWidth="1" />
			</div>
		</div>
		{#if ($isOpen || yScroll > 360) && $page.data.info}
			<div class="info flex items-center px-4 space-x-4">
				<div
					in:scale={{ duration: 100 }}
					class="play bg-purple-400 p-3 rounded-full flex items-center justify-center hover:scale-105 trasition duration-50"
				>
					<div class="icon translate-x-0.5">
						<Play fill="black" size="28" strokeWidth="0" />
					</div>
				</div>
				<h1
					in:fly={{ x: 40, duration: 200 }}
					class="text-2xl font-semibold tracking-tighter line-clamp-1"
				>
					{$page.data.info.title.english
						? $page.data.info.title.english
						: $page.data.info.title.romaji}
				</h1>
			</div>
		{/if}
		<div
			class="profile ml-auto bg-black w-40 h-8 items-center flex justify-between rounded-full p-0.5 pr-4 shrink-0 "
		>
			<div class="group space-x-4 flex items-center h-full">
				<div class="image aspect-square h-full  rounded-full truncate ">
					<img src={profile} alt="" class="w-full h-full object-cover" />
				</div>
				<h1 class=" text-zinc-100 text-sm">Eren</h1>
			</div>
			<div class="arrow rotate-180 cursor-pointer"><Triangle fill="white" size="8" /></div>
		</div>
	</div>
	<div
		class="{$isOpen || yScroll > 264
			? 'opacity-40'
			: 'opacity-0'} bg-[#121212] absolute inset-0 z-0"
	/>
</div>
