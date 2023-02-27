<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import {goto} from '$app/navigation'

	$: session = $page.data.session;

	let loading = false;
	let email = null;
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
				.select(`username, email, cover_url, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				username = data.username;
				email = data.email;
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

	async function updateProfile() {
		try {
			loading = true;
			const { user } = session;

			const updates = {
				id: user.id,
				username,
				cover_url: coverUrl,
				avatar_url: avatarUrl,
			};

			let { error } = await supabase.from('users').upsert(updates);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		} finally {
			loading = false;
			goto('/profile')
		}
	}
</script>

<div class="main py-16 px-8 ">
	<form class="form-widget" on:submit|preventDefault={updateProfile}>
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>
		<div class="main">
			<div>
				<label for="username">Name</label>
				<input class="text-black" id="username" type="text" bind:value={username} />
			</div>
			<div>
				<label for="username">avtar-url</label>
				<input class="text-black" id="username" type="text" bind:value={avatarUrl} />
			</div>
			<div>
				<label for="username">cover-url</label>
				<input class="text-black" id="username" type="text" bind:value={coverUrl} />
			</div>
		</div>
		<div>
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>
</div>
