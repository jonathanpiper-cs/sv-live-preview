<script>
	import ContentstackLivePreview from '@contentstack/live-preview-utils';
	import { PUBLIC_CS_API_KEY } from '$env/static/public';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('>> LivePreviewInit <<');
		ContentstackLivePreview.init({ stackDetails: { apiKey: PUBLIC_CS_API_KEY } });
	});
</script>

<h1>Welcome to my site</h1>
<slot></slot>
