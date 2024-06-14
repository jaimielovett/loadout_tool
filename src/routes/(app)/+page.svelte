<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';

	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ loadouts, supabase } = data);

	let handleSubmit: EventHandler<SubmitEvent, HTMLFormElement>;
	$: handleSubmit = async (evt) => {
		evt.preventDefault();
		if (!evt.target) return;

		const form = evt.target as HTMLFormElement;

		const loadout = (new FormData(form).get('loadout') ?? '') as string;
		if (!loadout) return;

		const { error } = await supabase.from('loadout').insert({ loadout });
		if (error) console.error(error);

		invalidate('supabase:db:loadouts');
		form.reset();
	};
</script>

<ul>
	{#each loadouts as loadout}
		<li>{loadout.name}</li>
	{/each}
</ul>
<form on:submit={handleSubmit}>
	<label>
		Add a loadout
		<input name="loadout" type="text" />
	</label>
</form>
