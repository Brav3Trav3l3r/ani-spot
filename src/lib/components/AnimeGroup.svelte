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

	<div class="card-group grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-3 gap-y-6 ">
		{#each data as anime}
			<Card {anime} {recentEpisode} />
		{/each}
	</div>
</div>
