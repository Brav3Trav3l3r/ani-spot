<script>
	import { Cover, Controls, EpAndInfo, MoreEpisodes } from '$lib/components';
	import { fly, scale } from 'svelte/transition';
	import { isOpen } from '../../lib/store/store';
	export let data;
	let { info, color } = data;
	$: color = data.color;
	$: info = data.info;
	let visible = false;

	function openEps() {
		if (info.episodes.length > 5) {
			isOpen.set(true);
		}
	}
</script>

{#if info.cover != info.image}
	<div data-sveltekit-preload-code='eager' class="cover-image h-[350px] fixed top-0 left-80 right-[18px] z-0 ">
		<img src={info.cover} alt="" class="h-full w-full object-cover brightness-75" />
	</div>
{/if}

<div
	class="{$isOpen
		? '-translate-y-8 brightness-75'
		: 'translate-y-0'} transform duration-300 ease-out relative z-20 pb-6"
>
	<div class="contents relative">
		<div class="cover relative">
			<Cover {info} {color} />
		</div>
		<div class="main relative bg-[#121212]">
			<div class="main relative z-20">
				<Controls/>
				<EpAndInfo {info} on:click={openEps} />
			</div>

			<div
				style:background-image="linear-gradient(0deg, transparent, {color || 'gray'}"
				class="gradient h-64 absolute inset-x-0 top-0 brightness-[0.4] "
			/>
		</div>
	</div>
</div>



