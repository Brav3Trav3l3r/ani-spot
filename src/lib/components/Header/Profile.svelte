<script>
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { logOut } from '../../actions/logout';
	import { Triangle } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';

	$: session = $page.data.session;
	let loading = false;
	let username;
	let avatarUrl;

	onMount(() => {
		getProfile();
	});

	$: getProfile(session);

	const getProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			const { data, error, status } = await supabase
				.from('users')
				.select(`username, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				username = data.username;
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

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

{#if browser}
	<div class="profile relative ml-auto shrink-0 cursor-pointer">
		{#if $page.data.session}
			<Menu as="div" class="menu">
				<MenuButton
					class="profile bg-black w-fit h-8 items-center flex justify-between rounded-full p-0.5 pr-4 border border-zinc-800"
				>
					<div class="group space-x-3 flex items-center h-full mr-3">
						<div class="image aspect-square h-full rounded-full truncate ">
							<img src={avatarUrl} alt="" class="w-full h-full object-cover" />
						</div>
						<h1 class=" text-zinc-100 text-sm  overflow-hidden grow-0 text-start font-medium">
							{username}
						</h1>
					</div>
					<div class="arrow rotate-180 cursor-pointer"><Triangle fill="white" size="8" /></div>
				</MenuButton>
				<MenuItems
					let:open
					class="flex flex-col absolute mt-1 bg-zinc-800 w-48 right-0 text-sm p-1 rounded focus:outline-none"
				>
					<MenuItem let:active href="/profile">
						<div class="{active ? 'bg-zinc-600' : 'transparent'} rounded p-2">Profile</div>
					</MenuItem>
					<MenuItem let:active href="/">
						<div class="{active ? 'bg-zinc-600' : 'transparent'} rounded p-2">Account</div>
					</MenuItem>
					<MenuItem let:active href="/">
						<div class="{active ? 'bg-zinc-600' : 'transparent'} rounded p-2">Setting</div>
					</MenuItem>
					<div class="logout" on:keydown on:click={signOut}>
						<MenuItem let:active>
							<div
								class="{active
									? 'bg-red-400 rounded p-2'
									: 'transparent border-t  border-zinc-600/50'} rounded p-2"
							>
								Log Out
							</div>
						</MenuItem>
					</div>
				</MenuItems>
			</Menu>
		{:else}
			<a href="/login"
				><div
					class="login bg-purple-500 py-2 px-6 rounded-md outline outline-offset-2 outline-purple-400"
				>
					<h1 class="text-xs">LOGIN</h1>
				</div></a
			>
		{/if}
	</div>
{/if}

<!-- <MenuItem

class={({ active }) =>
	active ? 'bg-red-400 rounded p-2' : 'transparent p-2 border-t-2 border-zinc-600/50'}
>
<input type="submit" value={loading ? 'Logging Out' : 'Log Out'} disabled={loading} />
</MenuItem> -->
