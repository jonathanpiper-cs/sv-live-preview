<script lang="ts">
	import type { IGenre } from '$lib/types';
	let { data } = $props();
	const entry: IGenre | null = data ? data.entry : null;
	import Personalize from '@contentstack/personalize-edge-sdk';

	const setAttribute = async (attribute: string, value: string) => {
		console.log('set attribute', attribute, value);
		const attrString = JSON.parse(`{ "${attribute}": "${value}" }`);
		await Personalize.set(attrString);
	};
</script>

{#if entry}
	<h1 data-cslp={entry.$.title}>{entry.title}</h1>
	<p data-cslp={entry.$.summary}>{entry.summary}</p>
	<p data-cslp={entry.$.description}>{@html entry.description}</p>
{/if}

<a class="anchor" onclick={() => setAttribute('favorite_genre', 'metal')}>I like metal</a>
