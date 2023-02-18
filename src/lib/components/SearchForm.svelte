<script>
	import {afterNavigate} from '$app/navigation';
	import { Search } from 'lucide-svelte';
    import {page} from '$app/stores'

    $:console.log($page)

	let searchBar;
    $: searchQuery = $page.params.query || ''

	afterNavigate(() => {
		searchBar.focus();
	});
</script>

<form action='/search' method="GET" role="search">
	<div class="serach bg-white w-80 rounded-full ml-6 flex px-4 items-center space-x-2">
		<div class="icon">
			<Search color="black" size="28" />
		</div>
		<input
			type="search"
			name="q"
            value={searchQuery}
			bind:this={searchBar}
			placeholder="Search"
			class="py-3 px-4 text-sm text-black focus:outline-none flex-1 rounded-lg"
		/>
	</div>
</form>
