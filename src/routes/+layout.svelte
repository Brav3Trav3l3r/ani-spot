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

<div class="root-layout relative">
	<Header {yScroll} />
	<Navbar />
	<div
		bind:this={box}
		on:scroll={getScroll}
		class="slot main fixed left-80 bottom-[90px] top-0 right-0 overflow-y-auto text-white "
	>
		<slot />
	</div>
	<Media />
	{#if $isOpen}
		<MoreEpisodes />
	{/if}
</div>
