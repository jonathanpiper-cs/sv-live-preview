<script>
	// @ts-nocheck

	/** @type {import('./$types').PageData}*/
	import { invalidate } from '$app/navigation';
	
	/**
	 * @typedef {Object} Props
	 * @property {any} data - import { onMount } from 'svelte';
	 */

	/** @type {Props} */
	let { data } = $props();
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
