<script>
	import { supabase } from '$lib/supabaseClient';

	let loading = false;
	let email;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			console.error('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<form class="" on:submit|preventDefault={handleLogin}>
	<div class="">
		<h1 class="header">Supabase + SvelteKit</h1>
		<p class="description">Sign in via magic link with your email below</p>
		<div>
			<input class="text-black" type="email" placeholder="Your email" bind:value={email} />
		</div>
		<div>
			<input
				type="submit"
				class="button block"
				value={loading ? 'Loading' : 'Send magic link'}
				disabled={loading}
			/>
		</div>
	</div>
</form>
