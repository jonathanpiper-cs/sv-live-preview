<script lang="ts">
	import type { IGenre } from '$lib/types';
	let { data } = $props();
	const entry: IGenre | null = data ? data.entry : null;
	import Personalize from '@contentstack/personalize-edge-sdk';

	let attr = $state({} as IGenre);

	const setAttribute = async (attribute: string, value: string) => {
		// console.log('set attribute', attribute, value);
		const attrObj = { [attribute]: value };
		// console.log('setting attribute', attrObj)
		attr = entry as IGenre;
		await Personalize.set(attrObj);
		console.log('user id', Personalize.getUserId());
		setTimeout(() => {
			console.log('active variant', Personalize.getVariants());
		}, 3000);
	};
	$effect(() => {
		console.log(entry);
	});
</script>

{#if entry}
	{attr.title}
	<h1 data-cslp={entry.$.title}>{entry.title}</h1>
	<p data-cslp={entry.$.summary}>{entry.summary}</p>
	<p data-cslp={entry.$.description}>{@html entry.description}</p>
{/if}

<a class="anchor" onclick={() => setAttribute('favorite_genre', 'metal')}>I like metal</a>
