<script>
	import { Card } from '$lib/components';
	export let recentEpisode = false
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import {ChevronRight, ChevronLeft } from 'lucide-svelte';
	export let data;
	export let title;

	let carousel;

	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		carousel.goTo(0, { animated: false });
	});
</script>

<div class="group relative">
	<div class="headings flex space-x-8 items-center">
		<h1 class="text-2xl font-semibold tracking-tight py-4 ">{title}</h1>
	</div>
	
	<div class="card-group flex gap-6 scrollbar-hide">
		{#if browser}
			<Carousel
				bind:this={carousel}
				let:showPrevPage
				let:showNextPage
				dots={false}
				infinite={false}
				particlesToShow={5}
				particlesToScroll={4}
			>
				<div
					slot="prev"
					on:keydown
					on:click={showPrevPage}
					class="custom-arrow custom-arrow-prev rounded-full p-2 absolute right-12 cursor-pointer z-50 -translate-y-12"
				>
					<ChevronLeft />
				</div>
				{#each data as anime}
					<Card {anime} {recentEpisode}/>
				{/each}
				<div
					slot="next"
					on:keydown
					on:click={showNextPage}
					class="custom-arrow custom-arrow-next rounded-full p-2 absolute right-2 cursor-pointer z-50 -translate-y-12"
				>
					<ChevronRight />
				</div>
			</Carousel>
		{/if}
	</div>
</div>
