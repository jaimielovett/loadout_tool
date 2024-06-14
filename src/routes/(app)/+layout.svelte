<script>
	import Nav from '$lib/components/nav.svelte';

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};
</script>

<Nav />

<div class="ml-[var(--nav-width)] p-4">
	<slot />
</div>
