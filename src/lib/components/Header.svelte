<script lang="ts">
    import type { IHeader } from '$lib/types';
	let { data }: { data: IHeader } = $props();
</script>

<div
	class="container flex h-fit w-full max-w-full flex-col items-center justify-center bg-black py-4"
>
	<div class="flex flex-col items-center pt-6">
		<h1 data-cslp={data.$.title} class="h1 font-bold mt-4"><span class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">{data && data.title}</span></h1>
		<h2 data-cslp={data.$.subtitle} class="h2 leading-relaxed"><span class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">{data && data.subtitle}</span></h2>
	</div>
	<div class="flex flex-row gap-5 leading-relaxed">
		{#each data.navigation as nav, index}
			<a data-sveltekit-reload href={nav.link.href} data-cslp={data.$[`navigation__${index}`]} class="mt-2 text-xl text-blue-500 hover:underline">{nav.link.title}</a
			>
		{/each}
	</div>
</div>
