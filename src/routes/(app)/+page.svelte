<script>
	export let data;
</script>

<ul>
	{#each data.chassis as chassis}
		<li>{chassis.name}</li>
	{/each}
</ul>
