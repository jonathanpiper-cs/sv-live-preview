<script lang="ts">
	let { data } = $props();
	const entries = data.entries || [];
</script>

<div class="container mx-auto my-4">
	<h1 class="text-2xl font-bold">Available Genres</h1>
	{#each entries as entry}
		<a href={entry.url}
			><h2 class="text-xl" data-cslp={entry.$.title}>{entry.title}</h2></a
		>
	{/each}
</div>
