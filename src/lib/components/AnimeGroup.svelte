<script>
	import { Card } from '$lib/components';
	export let recentEpisode = false;
	export let data;
	export let title;

</script>

<div class="group relative">
	<div class="headings flex space-x-8 items-center">
		<h1 class="text-2xl font-semibold tracking-tight py-4 ">{title}</h1>
	</div>

	<div class="card-group grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 gap-y-10 ">
		{#each data as anime}
			<Card {anime} {recentEpisode} />
		{/each}
	</div>
</div>
