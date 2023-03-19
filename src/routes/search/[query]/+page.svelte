<script>
	import Card from '../../../lib/components/Card.svelte';

	export let data;
	$: results = data.results.results;
</script>

<div class="main">
	<h1 class="text-2xl font-medium tracking-tight py-4">Top results for ~ {data.title}</h1>
	<div class="results grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 gap-y-10">
		{#each results as anime}
			<Card {anime} />
		{/each}
	</div>
</div>
