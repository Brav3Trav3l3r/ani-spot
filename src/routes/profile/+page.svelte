<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';

	$: session = $page.data.session;

	let loading = false;
	let username = null;
	let avatarUrl = null;
	let coverUrl = null;

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			const { data, error, status } = await supabase
				.from('users')
				.select(`username, cover_url, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				console.log(data)
				username = data.username;
				coverUrl = data.cover_url;
				avatarUrl = data.avatar_url;
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		} finally {
			loading = false;
		}
	};


</script>

<div class="main py-12 px-8">
	<h1>{username}</h1>
	<img src={avatarUrl} alt="">
	<h1>{coverUrl}</h1>
	<a href="/profile/update">Update Profile</a>
</div>


