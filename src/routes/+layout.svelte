<script>
	import '../app.css';
	import { isOpen, storeAnime, showList } from '../lib/store/store';
	import { Navbar, Media, Header, MoreEpisodes } from '$lib/components';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	NProgress.configure({ showSpinner: false });

	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		isOpen.set(false);
		yScroll = 0;
		NProgress.done();
		box.scrollTop = yScroll;
	});

	let box;
	let yScroll = 0;

	function getScroll() {
		yScroll = box.scrollTop;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/base.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/ui/buttons.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/ui/sliders.min.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/vidstack/dist/cdn/prod.js"></script>
</svelte:head>

<div class="root-layout relative">
	<Header {yScroll} />
	<Navbar />
	<div
		bind:this={box}
		on:scroll={getScroll}
		class="slot main fixed left-80 bottom-0 pb-[90px] top-0 right-0 overflow-y-auto text-white "
	>
		<slot />
	</div>
	{#if $storeAnime != null}
		<Media />
	{/if}
	{#if $isOpen}
		<MoreEpisodes />
	{/if}
</div>
