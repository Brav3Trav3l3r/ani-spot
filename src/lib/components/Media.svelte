<script>
	import { Pause, SkipBack, SkipForward, Volume2, ListVideo, Infinity, Mic } from 'lucide-svelte';
	let max = 24;
	let value = 10;
	import { isOpen } from '../store/boolean';
</script>

<div
	class="media fixed text-white inset-x-0 bottom-0 h-[90px] space-x-8 bg-neutral-900 flex items-center justify-center px-6 border-t-2  border-zinc-800"
>
	<div class="playing flex flex-col w-2/12 ">
		<h1 class="">8. After Rain</h1>
		<h1 class="text-sm text-zinc-400">Jujutsu Kaisen</h1>
	</div>
	<div class="controls flex flex-col flex-1 space-y-2 items-center  w-8/12">
		<div class="group flex items-center space-x-6 shrink-0">
			<div class="volume">
				<Mic color="#AFAFAF" size=20/>
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
				<Infinity color="#C084FC" size=20/>
			</div>
		</div>
		<div class="range w-full flex space-x-4 items-center justify-center max-w-xl">
			<h1 class="text-sm text-zinc-400">{value}</h1>
			<input type="range" min="0" {max} bind:value class="w-full cursor-pointer flex-1" />
			<h2 class="text-sm text-zinc-400 shrink-0">{max}</h2>
		</div>
	</div>
	<div class="icons-set bg-[#181818] gap-4 flex justify-end w-2/12">
		<div on:keydown on:click={() => isOpen.set(!$isOpen)} class="list cursor-pointer ">
			<ListVideo color="#AFAFAF" size=20/>
		</div>
		<div class="volume flex space-x-2 items-center ">
			<Volume2 color="#AFAFAF" size=20 />
			<div class="slider-container flex w-28">
				<input type="range" min="0" max="100" value="100" class="slider  cursor-pointer" />
			</div>
		</div>
	</div>
</div>

<style>
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
		background-color: #5E5E5E;
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
		border: 1px solid #C084FC;
		outline: 3px solid #C084FC;
		outline-offset: 0.125rem;
	}

	/******** Firefox styles ********/
	/* slider track */
	input[type='range']::-moz-range-track {
		background-color: #C084FC;
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
		border: 1px solid #C084FC;
		outline: 3px solid #C084FC;
		outline-offset: 0.125rem;
	}
</style>
