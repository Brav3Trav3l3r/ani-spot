<script>
	import { Card } from '$lib/components';
	export let data;
	export let title;
</script>

<div class="group p-8">
	<h1 class="text-2xl font-semibold tracking-tight py-4 ">{title}</h1>
	<div class="group card-group flex overflow-auto gap-6 scrollbar-hide">
		{#each data as anime}
			<Card {anime} />
		{/each}
	</div>
</div>
