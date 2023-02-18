<script>
	import { Play, Search } from 'lucide-svelte';
	import SearchForm from './SearchForm.svelte'
	import tippy from '$lib/actions/tippy';
	import { fly, scale } from 'svelte/transition';
	import { ChevronLeft, ChevronRight, Triangle } from 'lucide-svelte';
	import profile from '../../assets/eren.png';
	import { page } from '$app/stores';
	import { isOpen, storeAnime, showList } from '../store/store.js';
	import { afterNavigate } from '$app/navigation';
	export let yScroll;
	let color;


	$: changeTitle($showList);

	let title;

	function changeTitle(n) {
		if (n & ($storeAnime != null)) {
			title = $storeAnime.title.english ? $storeAnime.title.english : $storeAnime.title.romaji;
		} else if ($page.data.info) {
			title = $page.data.info.title.english
				? $page.data.info.title.english
				: $page.data.info.title.romaji;
		}
	}

	afterNavigate(() => {
		changeTitle(false);
		if ($page.data.color) {
			color = $page.data.color;
		} else {
			color = 'black';
		}
	});
</script>

<div
	class="header h-16 fixed left-80 right-0 text-white top-0 z-50 bg-[#070707]"
	style:background-color={$isOpen || yScroll > 264
		? color
		: 'transparent'}
>
	<div class="interact relative items-center flex px-8 z-10 h-full w-full">
		<div class="arrows flex space-x-2 ">
			<div class="left-arrow bg-black/80 p-1 rounded-full cursor-pointer">
				<ChevronLeft color="#d1d1d1" size="28" strokeWidth="1" />
			</div>
			<div class="right-arrow bg-black/80 p-1 rounded-full cursor-pointer ">
				<ChevronRight color="#d1d1d1" size="28" strokeWidth="1" />
			</div>
		</div>
		{#if ($page.data.info || $storeAnime) && (yScroll > 360 || $isOpen ) && ($page.route.id === '/[id]')}
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
					{title ? title : ''}
				</h1>
			</div>
		{:else if $page.url.pathname.startsWith('/search')}
			<SearchForm/>
		{/if}
		<button
			use:tippy={{
				content:
					'<ul><li>Profile</li><li>Libray</li><li>Setting</li><li class="text-red-400">Log Out</li></ul>',
				animation: 'scale-extreme',
				interactive: true,
				trigger: 'click',
				arrow: false,
				allowHTML: true,
				placement: 'bottom-end',
				// inertia: true,
				duration: [100, 0]
			}}
			class="profile ml-auto bg-black w-40 h-8 items-center flex justify-between rounded-full p-0.5 pr-4 shrink-0 cursor-pointer"
		>
			<div class="group space-x-4 flex items-center h-full">
				<div class="image aspect-square h-full  rounded-full truncate ">
					<img src={profile} alt="" class="w-full h-full object-cover" />
				</div>
				<h1 class=" text-zinc-100 text-sm">Eren</h1>
			</div>
			<div class="arrow rotate-180 cursor-pointer"><Triangle fill="white" size="8" /></div>
		</button>
	</div>
	<div
		class="{$isOpen || yScroll > 264
			? 'opacity-40'
			: 'opacity-0'} bg-[#070707] absolute inset-0 z-0"
	/>
</div>
