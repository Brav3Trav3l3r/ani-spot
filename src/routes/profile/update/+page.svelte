<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

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
				avatar_url: avatarUrl
			};

			let { error } = await supabase.from('users').upsert(updates);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		} finally {
			loading = false;
			goto('/profile');
		}
	}
</script>

<div class="main pt-16 flex fixed left-80 bottom-0 right-0 top-0">
	<div class="form p-8 w-1/2 h-full bg-neutral-900 space-y-8">
		<h1 class="text-xl font-semibold">Profile Update</h1>
		<form class="form" on:submit|preventDefault={updateProfile}>
			<div class="main space-y-4">
				<div class="flex flex-col gap-1">
					<label for="username" class="">Name</label>
					<input
						class="bg-transparent focus:outline-none focus:border-zinc-400 focus:bg-zinc-700/50 border p-2 rounded-md border-zinc-700 text-zinc-400 focus:text-zinc-300 text-sm transition-all duration-400"
						id="username"
						type="text"
						bind:value={username}
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="email">Email</label>
					<input
						class="focus:outline-none focus:border-zinc-400 focus:bg-zinc-700/50 text-zinc-400 focus:text-zinc-300 text-sm bg-transparent border p-2 rounded-md border-zinc-700"
						id="email"
						type="text"
						bind:value={email}
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="avatarUrl">Avtar Url</label>
					<input
						class="focus:outline-none focus:border-zinc-400 focus:bg-zinc-700/50 text-zinc-400 focus:text-zinc-300 text-sm bg-transparent border p-2 rounded-md border-zinc-700"
						id="avatarUrl"
						type="text"
						bind:value={avatarUrl}
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="coverUrl">Cover Url</label>
					<input
						class="focus:outline-none focus:border-zinc-400 focus:bg-zinc-700/50 text-zinc-400 focus:text-zinc-300 text-sm bg-transparent border p-2 rounded-md border-zinc-700"
						id="coverUrl"
						type="text"
						bind:value={coverUrl}
					/>
				</div>
			</div>

			<input
				type="submit"
				class="button cursor-pointer block primary p-2 rounded-md bg-white text-black font-semibold w-full mt-10"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</form>
		<div class="delete top-28 relative space-y-2">
			<h1 class="text-red-400 text-sm">Delete Account</h1>
			<p class="text-sm text-zinc-400">
				It is possible to delete your account, but it is irreversible. Please be sure you want to do
				that.
			</p>
		</div>
	</div>
	<div class="live-profile w-1/2 h-full">
		<div class="cover h-60 w-full relative bg-zinc-800 outline-none">
			{#await getProfile()}
				<div
					class="skeleton w-56 aspect-square absolute bottom-8 left-10 rounded-full bg-zinc-900 animate-pulse"
				/>
			{:then}
				<div class="cover-image h-full w-full object-cover outline-none">
					<img src={coverUrl} class="h-full w-full object-cover brightness-75" alt="" />
				</div>
				<div class="absolute flex items-end top-20 left-6 bottom-6  right-10 space-x-8">
					<div class="avatar-image w-36 aspect-square relative rounded-full bg-zinc-900">
						<img
							src={avatarUrl}
							class="w-full h-full z-10 relative object-cover rounded-full"
							alt=""
						/>
						<div
							class="absolute w-40 inset-0 aspect-square z-0 bg-zinc-900/70 rounded-full -translate-y-2 -translate-x-2 blur-md"
						/>
					</div>

					<div class="info ">
						<h1 class="text-xs font-medium px-1">PROFILE</h1>
						<h1
							class="text-5xl text-start font-bold line-clamp-3 overflow-hidden tracking-tight pt-1 pb-4"
						>
							{username}
						</h1>
						<h1 class="text-xs font-medium px-1">0 Likes . 0 Following</h1>
					</div>
				</div>
			{/await}
		</div>
	</div>
</div>
