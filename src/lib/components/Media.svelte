<script>
	import { Volume, Volume1, Volume2, VolumeX, ListVideo, Maximize2, X } from 'lucide-svelte';
	import 'iconify-icon';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { isOpen, showList, storeAnime, epId } from '../store/store';
	import { storeVolume, provider, isDubbed } from '$lib/store/media';

	$:console.log(subSrc)
	$:console.log($provider)
	let animeTitle;
	let url;
	let subSrc;
	let showPlayer = false;
	let player;
	let isFullscreenActive = false;
	let duration;
	let currentTime = 0;
	let playbackReady;
	let isPlaying;
	let buffering;
	let muted = false;

	$: displayDuration = convertSeconds(duration);
	$: displayCurrentTime = convertSeconds(currentTime);

	const convertSeconds = (value) => {
		let minutes = Math.floor(value / 60);
		let extraSeconds = value % 60;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		extraSeconds = extraSeconds < 10 ? '0' + extraSeconds : extraSeconds;
		return minutes + ':' + extraSeconds;
	};

	$: animeTitleChange($storeAnime);

	function animeTitleChange(m) {
		if (m != null) {
			animeTitle = m.title.english ? m.title.english : m.title.roamji;
		}
	}

	function handleList() {
		if ($storeAnime != null || $page.data.info) {
			isOpen.set(true);
			showList.set(true);
		}
	}

	onMount(async () => {
		const { defineCustomElements } = await import('@vime/core');
		defineCustomElements();
		showPlayer = true;
		// player.volume = { $storeVolume };
	});

	$: if ($epId !== null) {
		console.log('ran');
		getUrl($epId.id);
	}

	const search = async (array) => {
		if (array != null) {
			const obj = await array.find((el) => el.quality === 'default' || el.quality === 'auto');
			return obj.url;
		}
	};

	const getUrl = async (id) => {
		if (id != null) {
			const res = await fetch(`https://api-consumet-rust.vercel.app/meta/anilist/watch/${id}?provider=${$provider}`);
			const data = await res.json();
			const sources = data.sources;
			const promise = await search(sources);
			url = promise;
			if ($provider === 'zoro') {
				const subtitles = data.subtitles;
				const subData = await subtitles.find((el) => el.lang === 'English');
				subSrc = await subData.url;
			}
		}
	};
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css" />

	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<script
		defer
		type="module"
		src="https://cdn.jsdelivr.net/npm/@vime/core@^5/dist/vime/vime.esm.js"
	>
	</script>
</svelte:head>

<div
	in:fly={{ y: 40, duration: 300 }}
	class="media fixed text-white bottom-0 w-80 flex gap-y-4 flex-col z-50 py-4"
>
	<div
		in:fly={{ y: 60, delay: 400, duration: 200 }}
		class="icons-set gap-4 flex justify-between px-4"
	>
		<div class="group1">
			<div class="volume flex space-x-2 items-center ">
				<div
					on:keydown
					on:click={() => {
						if (muted) {
							player.muted = false;
						} else {
							player.muted = true;
						}
					}}
					class="vol-icon cursor-pointer"
				>
					{#if muted || $storeVolume === 0}
						<VolumeX color="#AFAFAF" size="20" />
					{:else if $storeVolume > 70}
						<Volume2 color="#AFAFAF" size="20" />
					{:else if $storeVolume > 30}
						<Volume1 color="#AFAFAF" size="20" />
					{:else}
						<Volume color="#AFAFAF" size="20" />
					{/if}
				</div>
				<div class="slider-container flex w-20">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={$storeVolume}
						class="slider w-full cursor-pointer"
						on:input={(event) => {
							player.volume = event.target.value;
							if (muted) {
								player.muted = false;
							}
						}}
					/>
				</div>
			</div>
		</div>
		<div class="group2 flex gap-2">
			<button
				on:click={handleList}
				disabled={$storeAnime === null || $isOpen === true}
				class:disabled={$storeAnime === null || $isOpen === true}
			>
				<ListVideo color="#AFAFAF" size="20" />
			</button>
			<button>
				<X color="#AFAFAF" size="20" />
			</button>
		</div>
	</div>

	<div class="video aspect-video w-80 group relative focus:outline-none z-0">
		{#key url}
			{#if url != null}
				<div in:fly={{ y: 60, delay: 200, duration: 400 }} class="player relative z-0">
					{#if showPlayer}
						<vm-player
							bind:this={player}
							on:vmMutedChange={(event) => (muted = event.detail)}
							on:vmBufferingChange={(event) => (buffering = event.detail)}
							on:vmPlayingChange={(event) => (isPlaying = event.detail)}
							on:vmFullscreenChange={(event) => (isFullscreenActive = event.detail)}
							on:vmPlaybackReady={(event) => {
								player.muted = true;
								playbackReady = event.detail;
								player.volume = $storeVolume;
							}}
							on:vmVolumeChange={(event) => storeVolume.set(event.detail)}
							on:vmDurationChange={(event) => (duration = Math.trunc(event.detail))}
							on:vmCurrentTimeChange={(event) => (currentTime = Math.trunc(event.detail))}
						>
							<vm-hls version="latest" poster={$epId.image}>
								<source data-src="https://proxy.vnxservers.com/{url}" type="application/x-mpegURL" />
								{#if subSrc}
									<track
										default
										kind="subtitles"
										src="https://proxy.vnxservers.com/{subSrc}"
										srclang="en"
										label="English"
									/>
								{/if}
							</vm-hls>

							<vm-ui>
								{#if isFullscreenActive}
									<vm-default-controls />
								{/if}
							</vm-ui>
						</vm-player>
					{/if}
				</div>

				<div
					on:keydown
					on:click={() => player.enterFullscreen()}
					class="icon absolute z-10 top-2 right-2 hidden group-hover:block cursor-pointer p-3 rounded-full aspect-square bg-black/50"
				>
					<Maximize2 size="20" color="white" />
				</div>
			{/if}
		{/key}
	</div>

	<div
		class="playing flex flex-col space-y-1 px-4 relative z-10 bg-gradient-to-t from-black to-black/0"
	>
		<h1 class="line-clamp-1 text-sm">{$epId ? $epId.number + '.' + ' ' + $epId.title : ''}</h1>
		<a href="/{$storeAnime.id}"
			><h1 class="text-xs font-light text-zinc-400 line-clamp-1 hover:underline underline-offset-2">
				{animeTitle ? animeTitle : ''}
			</h1></a
		>
	</div>
	<!-- <div class="controls flex flex-col flex-1 space-y-2 items-center  w-2/4">
		<div class="group flex items-center space-x-6 shrink-0">
			<div class="volume">
				{#if $isDubbed}
					<Mic color="#AFAFAF" size="20" />
				{:else}
					<Mic color="#C084FC" size="20" />
				{/if}
			</div>
			<div class="back">
				<SkipBack fill="#BABABA" color="#BABABA" />
			</div>
			<div
				on:keydown
				on:click={() => {
					if (isPlaying) {
						player.pause();
					} else {
						player.play();
					}
				}}
				class="media bg-zinc-200 w-10 aspect-square rounded-full flex items-center justify-center cursor-pointer"
			>
				<div class="icon w-full h-full flex justify-center items-center">
					{#if buffering || !playbackReady}
						<div
							class="icon w-full h-full justify-center items-center aspect-square font-bold text-3xl text-zinc-700 flex "
						>
							<iconify-icon icon="line-md:loading-twotone-loop" />
						</div>
					{:else if !isPlaying}
						<div class="pause translate-x-0.5">
							<Play fill="black" strokeWidth="0" />
						</div>
					{:else if isPlaying}
						<div class="play ">
							<Pause fill="black" strokeWidth="0" />
						</div>
					{:else}
						<div
							class="icon w-full h-full justify-center items-center aspect-square font-bold text-3xl text-zinc-700 flex "
						>
							<iconify-icon icon="line-md:loading-twotone-loop" />
						</div>
					{/if}
				</div>
			</div>
			<div class="back">
				<SkipForward fill="#BABABA" color="#BABABA" />
			</div>
			<div class="volume">
				<Infinity color="#C084FC" size="20" />
			</div>
		</div>
		<div class="range w-full flex space-x-4 items-center justify-center max-w-xl">
			<h1 class="text-xs text-zinc-400">{displayCurrentTime}</h1>
			<input
				on:input={(event) => {
					player.currentTime = event.target.value;
				}}
				type="range"
				min="0"
				max={duration}
				bind:value={currentTime}
				class="w-full cursor-pointer flex-1"
			/>
			<h2 class="text-xs text-zinc-400 shrink-0">{displayDuration}</h2>
		</div>
	</div>-->
</div>

<style>
	button {
		cursor: pointer;
	}
	.disabled {
		filter: brightness(50%);
	}
	/********** Range Input Styles **********/
	/*Range Reset*/
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
	}

	/* Removes default focus */
	input[type='range']:focus {
		outline: none;
	}

	/***** Chrome, Safari, Opera and Edge Chromium styles *****/
	/* slider track */
	input[type='range']::-webkit-slider-runnable-track {
		background-color: #5e5e5e;
		border-radius: 0.5rem;
		height: 0.3rem;
	}

	/* slider thumb */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		margin-top: -3px; /* Centers thumb on the track */
		border-radius: 50%;
		/*custom styles*/
		background-color: white;
		height: 0.7rem;
		width: 0.7rem;
	}

	/* input[type='range']:focus::-webkit-slider-thumb {
		border: 1px solid #c084fc;
		outline: 3px solid #c084fc;
		outline-offset: 0.125rem;
	} */

	/******** Firefox styles ********/
	/* slider track */
	input[type='range']::-moz-range-track {
		background-color: #5e5e5e;
		border-radius: 0.5rem;
		height: 0.3rem;
	}

	/* slider thumb */
	input[type='range']::-moz-range-thumb {
		border: none; /*Removes extra border that FF applies*/
		margin-top: -3px; /* Centers thumb on the track */
		border-radius: 50%;
		/*custom styles*/
		background-color: white;
		height: 0.7rem;
		width: 0.7rem;
	}

	/* input[type='range']:focus::-moz-range-thumb {
		border: 1px solid #c084fc;
		outline: 3px solid #c084fc;
		outline-offset: 0.125rem;
	} */
</style>
