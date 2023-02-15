<script>
	import { Play, Heart, MoreHorizontal } from 'lucide-svelte';
	import IoIosPlay from 'svelte-icons/io/IoIosPlay.svelte';
	import { page } from '$app/stores';
</script>

<div class="controls py-6 px-8 flex items-center space-x-6">
	<div class="play bg-purple-400 p-3 rounded-full flex items-center justify-center">
		<div class="icon translate-x-0.5">
			<Play fill="black" size="32" strokeWidth="0" />
		</div>
	</div>
	<div class="heart-icon text-white/50 hover:text-white/80 cursor-pointer ">
		<Heart size="32" />
	</div>
	<div class="dots-icon text-white/50 hover:text-white/80 cursor-pointer">
		<MoreHorizontal size="32" />
	</div>
	{#if $page.data.info && $page.data.info.trailer}
		<div
			on:keydown
			on:click
			class="trailer px-6 py-2 border-2 border-zinc-400/60 rounded-md hover:cursor-pointer"
		>
			{#if $page.data.info.type === 'MUSIC'}
				<h1 class=" text-sm font-medium">PLAY</h1>
			{:else}
				<h1 class=" text-sm font-medium">TRAILER</h1>
			{/if}
		</div>
	{/if}
</div>
