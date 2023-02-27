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

<div class="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<img
				class="mx-auto h-12 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				alt="Your Company"
			/>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
				Sign in to your account
			</h2>
		</div>
		<form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
			<input type="hidden" name="remember" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="email-address" class="sr-only">Email address</label>
					<input
						id="email-address"
						bind:value={email}
						name="email"
						type="email"
						autocomplete="email"
						required
						class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-gray-100">Remember me</label>
				</div>
			</div>

			<input
				type="submit"
				disabled={loading}
				value={loading ? 'Loading' : 'Send magic link'}
				class="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
			/>
		</form>
	</div>
</div>
