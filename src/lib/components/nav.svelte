<script lang="ts">
	import { CirclePlus, Shield } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toolVersion } from '$lib/store';

	async function onSubmit(event: Event) {
		const formData = new FormData(event.currentTarget as HTMLFormElement);

		const response = await fetch((event.currentTarget as HTMLFormElement).action, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<aside
	class="z-100 fixed flex h-full w-[var(--nav-width)] flex-col border-r-2 border-border px-3 py-4"
>
	<h1 class="mb-1 text-center text-3xl font-bold">🚀 Loadout Tool</h1>
	<p class="text-center text-sm">v{$toolVersion}</p>
	<hr class="mb-4 mt-2" />

	<div class="flex flex-grow flex-col">
		<form method="POST" on:submit|preventDefault={onSubmit} action="/?/createLoadout">
			<Button class="w-full" type="submit">
				New Loadout
				<CirclePlus class="ml-2 h-4 w-4" />
			</Button>
		</form>
		<Button variant="ghost" class="flex w-full justify-between">
			<span class="flex items-center">
				<Shield class="mr-2 h-4 w-4" />
				Shields
			</span>
			+
		</Button>
	</div>

	<div>Request a feature Report a bug</div>
	<Button class="w-full" href="/logout">Logout</Button>
</aside>
