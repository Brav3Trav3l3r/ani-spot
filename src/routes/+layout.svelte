<script>
	import '../app.css';
	import { isOpen, storeAnime, showList } from '../lib/store/store';
	import { Navbar, Media, Header, MoreEpisodes, Footer } from '$lib/components';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

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

	<title>{$page.data.title ? $page.data.title : 'Spotani'}</title>
</svelte:head>

<div class="root-layout relative font-lato">
	{#if $page.route.id != '/login'}
		<Header {yScroll} />
	{/if}
	<Navbar />
	<div
		bind:this={box}
		on:scroll={getScroll}
		class="slot main  fixed left-80 bottom-0 top-0 right-0 overflow-y-auto text-white "
	>
		<div class="slot relative z-10 mb-10">
			<slot />
		</div>
		<Footer/>
	</div>

	{#if $storeAnime != null}
		<Media />
	{/if}
	{#if $isOpen}
		<MoreEpisodes />
	{/if}
</div>
