<script>
	import { MoreHorizontal } from 'lucide-svelte';
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

<div class="cover h-[350px] w-full relative bg-zinc-800 outline-none">
	{#await getProfile()}
		<div
			class="skeleton w-56 aspect-square absolute bottom-8 left-10 rounded-full bg-zinc-900 animate-pulse"
		/>
	{:then}
		<div class="cover-image h-full w-full object-cover outline-none">
			<img src={coverUrl} class="h-full w-full object-cover brightness-75" alt="" />
		</div>
		<div class="absolute flex items-end top-20 left-10 bottom-8  right-10 space-x-8">
			<div class="avatar-image w-56 aspect-square relative rounded-full bg-zinc-900">
				<img src={avatarUrl} class="w-full h-full z-10 relative object-cover rounded-full" alt="" />
				<div
					class="absolute w-60 inset-0 aspect-square z-0 bg-zinc-900/70 rounded-full -translate-y-2 -translate-x-2 blur-md"
				/>
			</div>

			<div class="info ">
				<h1 class="text-sm font-medium px-2">PROFILE</h1>
				<h1
					class="text-8xl text-start font-bold line-clamp-3 overflow-hidden tracking-tight pt-1 pb-4"
				>
					{username}
				</h1>
				<h1 class="text-sm font-medium px-2">0 Likes . 0 Following</h1>
			</div>
		</div>
	{/await}
</div>

<div class="main px-8 pt-8 space-y-10">
	<div class="icon">
		<MoreHorizontal size="32" color="#A5A5A5" />
		<a href="/profile/update" class="text-sm text-zinc-400">Update Profile</a>
	</div>

	<div class="Profile  space-y-4">
		<h1 class="text-2xl">Profile</h1>
		<h1 class="text-zinc-500">Nothing to show for now</h1>
	</div>
</div>
