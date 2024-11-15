<script lang="ts">
	import '../app.css';
	import ContentstackLivePreview from '@contentstack/live-preview-utils';
	import { PUBLIC_CS_API_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import type { LayoutData } from './$types';
	import { type Snippet } from 'svelte';
	// import { setContext } from 'svelte';
	import Personalize from '@contentstack/personalize-edge-sdk';
	import { PUBLIC_CS_PERSONALIZE_PROJECT_UID } from '$env/static/public';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	onMount(async () => {
		if (!Personalize.getUserId()) {
			await Personalize.init(PUBLIC_CS_PERSONALIZE_PROJECT_UID, {
				// request
			});
		}
		ContentstackLivePreview.init({
			stackDetails: { apiKey: PUBLIC_CS_API_KEY, environment: 'prod', locale: 'en-us' },
			mode: 'builder'
		});
	});

	// setContext('personalize', Personalize);
</script>

<Header data={data.header}></Header>
<div class="container mx-auto my-4">
	{@render children()}
</div>

<style>
	:global {
		@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

		html {
			font-family: 'Inter', sans-serif;
		}
	}
</style>
