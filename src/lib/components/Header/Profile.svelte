<script>
	import { supabase } from '$lib/supabaseClient';
	import { Triangle } from 'lucide-svelte';
	import profile from '../../../assets/eren.png';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';

	let loading = false;

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
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
					class="profile bg-black w-40 h-8 items-center flex justify-between rounded-full p-0.5 pr-4 "
				>
					<div class="group space-x-4 flex items-center h-full">
						<div class="image aspect-square h-full  rounded-full truncate ">
							<img src={profile} alt="" class="w-full h-full object-cover" />
						</div>
						<h1 class=" text-zinc-100 text-sm">Eren</h1>
					</div>
					<div class="arrow rotate-180 cursor-pointer"><Triangle fill="white" size="8" /></div>
				</MenuButton>
				<MenuItems
					class="menu-items drop-shadow-xl absolute right-0 top-10 bg-zinc-800 rounded-md  flex flex-col space-y-1 px-1 py-1 text-sm w-52 focus:outline-none"
				>
					<MenuItem
						class={({ active }) => (active ? 'bg-zinc-600 rounded p-2' : 'transparent p-2')}
					>
						<a href="/" class="">Profile</a></MenuItem
					>
					<MenuItem
						class={({ active }) => (active ? 'bg-zinc-600 rounded p-2' : 'transparent p-2')}
					>
						<a href="/" class="">Account</a></MenuItem
					>
					<MenuItem
						class={({ active }) => (active ? 'bg-zinc-600 rounded p-2' : 'transparent p-2')}
					>
						<a href="/" class="">Setting</a></MenuItem
					>
					
					<MenuItem class={({ active }) => (active ? 'bg-red-400 rounded p-2' : 'transparent p-2 border-t-2 border-zinc-600/50')}>
						<button on:click={signOut} disabled={loading}>Log Out</button>
					</MenuItem>
				</MenuItems>
			</Menu>
		{:else}
			<a href="/login"
				><div class="login bg-purple-500 py-2 px-6 rounded-full">
					<h1 class="text-sm">LOGIN</h1>
				</div></a
			>
		{/if}
	</div>
{/if}
