<script lang="ts">
	import { CirclePlus, Shield } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<aside
	class="z-100 fixed flex h-full w-[var(--nav-width)] flex-col border-r-2 border-border px-3 py-4"
>
	<h1 class="mb-2 text-center text-3xl font-bold">🚀 Loadout Tool</h1>
	<hr class="mb-4" />

	<div class="flex flex-grow flex-col">
		<Button class="w-full">
			New Loadout
			<CirclePlus class="ml-2 h-4 w-4" />
		</Button>
		<Button variant="ghost" class="flex w-full justify-between">
			<span class="flex items-center">
				<Shield class="mr-2 h-4 w-4" />
				Shields
			</span>
			+
		</Button>
	</div>

	<div>Request a feature Report a bug</div>
</aside>
