<script lang="ts">
	let { data } = $props();
	const entry = data ? data.entry : null;
    $effect(() => {
        console.log(entry)
    })
</script>

<h1 data-cslp={entry.$ && entry.$.title}>{entry && entry.title}</h1>
<p>{entry && entry.heading}</p>
<p>{entry && entry.body}</p>
<img src={entry.banner.url} alt="sports" />
