<script>
	export let info;
	export let color;
	import { Verified } from 'lucide-svelte';
	let animeTitle;

	$: titleSwap(info);

	const titleSwap = async () => {
		animeTitle = info.title.english ? info.title.english : info.title.romaji;
	};
</script>

<div class="cover h-[350px] w-full relative z-20">
	{#if info.cover === info.image}
		<div class="image w-60 relative top-20 left-8 aspect-square">
			<div class=" absolute blur-xl inset-0 bg-black opacity-50" />
			<img src={info.cover} class="relative w-full h-full object-cover " alt="" />
		</div>
	{/if}

	<div
		class="{info.cover === info.image
			? 'left-80'
			: 'left-6'} absolute bottom-6 right-6 top-16 flex flex-col justify-end"
	>
		{#if info.studios && info.studios.length > 0}
			<div class="studio flex items-center pb-2">
				<div class="icon">
					<Verified fill="#3D91F4" strokeWidth="1" size="28" />
				</div>
				<h1 class="px-1 text-sm">{info.studios}</h1>
			</div>
		{/if}
		<h1
			class="{animeTitle.length > 30
				? 'text-6xl'
				: 'text-8xl'} title-text font-bold font-lexend line-clamp-3 overflow-hidden tracking-tight pt-1 pb-4"
		>
			{animeTitle}
		</h1>
		<div class="group flex space-x-4 mt-4 p-1 pt-1">
			<div class="nest-group flex space-x-2">
				{#if info.releaseDate != null}
					<h1>{info.releaseDate}</h1>
				{/if}
				{#if info.season != null}
					<h1>{info.season}</h1>
				{/if}
			</div>
			<h1>|</h1>
			{#if info.genres && info.genres.length > 0}
				<ul class="flex space-x-3">
					{#each info.genres as genre}
						<li class="">{genre}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>

{#if info.cover === info.image}
	<div
		style:background-image="linear-gradient(0deg, transparent, {color || 'gray'}"
		class="gradient h-[600px] inset-x-0 absolute top-0 z-0"
	/>
{/if}
