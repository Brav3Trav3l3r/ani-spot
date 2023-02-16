<script>
	import { Pause, SkipBack, SkipForward, Volume2, ListVideo, Infinity, Mic } from 'lucide-svelte';
	import { page } from '$app/stores';
	let max = 24;
	let value = 10;
	import { isOpen, showList, storeAnime, epId } from '../store/store';

	let animeTitle
	
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
</script>

<div
	class="media fixed text-white inset-x-0 bottom-0 h-[90px] space-x-8 bg-neutral-900 flex items-center justify-center px-6 border-t-2 z-50 border-zinc-800"
>
	<div class="playing flex flex-col w-2/12 ">
		<h1 class="line-clamp-1">{$epId ? $epId.number + '.' + ' ' + $epId.title : ''}</h1>
		<h1 class="text-sm text-zinc-400 line-clamp-1">{animeTitle ? animeTitle : ''}</h1>
	</div>
	<div class="controls flex flex-col flex-1 space-y-2 items-center  w-8/12">
		<div class="group flex items-center space-x-6 shrink-0">
			<div class="volume">
				<Mic color="#AFAFAF" size="20" />
			</div>
			<div class="back">
				<SkipBack fill="#BABABA" color="#BABABA" />
			</div>
			<div class="icons flex">
				<div class="play bg-white p-1.5 rounded-full flex items-center justify-center">
					<div class="icon ">
						<Pause fill="black" strokeWidth="0" />
					</div>
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
			<h1 class="text-xs text-zinc-400">{value}</h1>
			<input type="range" min="0" {max} bind:value class="w-full cursor-pointer flex-1" />
			<h2 class="text-xs text-zinc-400 shrink-0">{max}</h2>
		</div>
	</div>
	<div class="icons-set  gap-4 flex justify-end w-2/12">
		<button
			on:click={handleList}
			disabled={$storeAnime === null || $isOpen === true}
			class:disabled={$storeAnime === null || $isOpen === true}
		>
			<ListVideo color="#AFAFAF" size="20" />
		</button>
		<div class="volume flex space-x-2 items-center ">
			<Volume2 color="#AFAFAF" size="20" />
			<div class="slider-container flex w-28">
				<input type="range" min="0" max="100" value="100" class="slider  cursor-pointer" />
			</div>
		</div>
	</div>
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
		width: 15rem;
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
		margin-top: -6px; /* Centers thumb on the track */
		border-radius: 50%;
		/*custom styles*/
		background-color: white;
		height: 1rem;
		width: 1rem;
	}

	input[type='range']:focus::-webkit-slider-thumb {
		border: 1px solid #c084fc;
		outline: 3px solid #c084fc;
		outline-offset: 0.125rem;
	}

	/******** Firefox styles ********/
	/* slider track */
	input[type='range']::-moz-range-track {
		background-color: #c084fc;
		border-radius: 0.5rem;
		height: 0.5rem;
	}

	/* slider thumb */
	input[type='range']::-moz-range-thumb {
		border: none; /*Removes extra border that FF applies*/
		border-radius: 0; /*Removes default border-radius that FF applies*/

		/*custom styles*/
		background-color: white;
		height: 1rem;
		width: 1rem;
	}

	input[type='range']:focus::-moz-range-thumb {
		border: 1px solid #c084fc;
		outline: 3px solid #c084fc;
		outline-offset: 0.125rem;
	}
</style>
