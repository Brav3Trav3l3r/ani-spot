<script>
	import { Featured, AnimeGroup } from '$lib/components';
	export let data;
	let { trend, recent, popular } = data;
	$: recent = recent.results
	$: popular = popular.results
	$: trend = trend.results
</script>

<div class="home">
	<Featured />
	<AnimeGroup data = {trend} title='Trending'/>
	<AnimeGroup data = {recent} title='Recent Releases'/>
	<AnimeGroup data = {popular} title='Poplular'/>
</div>
