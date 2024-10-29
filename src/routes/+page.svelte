<script>
	// @ts-nocheck

	/** @type {import('./$types').PageData}*/
	import { invalidate } from '$app/navigation';
	// import { onMount } from 'svelte';
	export let data;
	const entry = data ? data.entry : null;
</script>

<svelte:window
	onmessage={(e) => {
		if (e.data.from === 'live-preview' && e.data.data.type === 'reload') {
			invalidate('livepreivew');
		}
	}}
/>

<h1>{entry && entry.title}</h1>
<p>{entry && entry.heading}</p>
<img src={entry.banner.url} alt="sports" />
