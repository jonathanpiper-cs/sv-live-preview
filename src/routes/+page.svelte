<script lang="ts">
	let { data } = $props();
	const entry = data ? data.entry : null;
</script>

<h1 data-cslp={entry.$ && entry.$.title}>{entry && entry.title}</h1>
<p>{entry && entry.heading}</p>
<img src={entry.banner.url} alt="sports" />
