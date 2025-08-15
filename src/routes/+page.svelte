<script lang="ts">
	import { onMount } from 'svelte';
	import { loadModule } from '$lib/component-loader.js';

    let { data } = $props();
    let divRef: HTMLElement;

    const svelteVersion = data.svelteVersion;

    onMount(async () => {
        const module = await loadModule(data.js); 
        module(divRef, {name: "World"});
    })
</script>

<svelte:head>
    {@html `
    <script type="importmap">
        {
            "imports": {
                "svelte": "https://esm.sh/svelte@${svelteVersion}",
                "svelte/internal/disclose-version": "https://esm.sh/svelte@${svelteVersion}/internal/disclose-version",
                "svelte/internal/": "https://esm.sh/svelte@${svelteVersion}/internal/"
            }
        }
    <\/script>
    `}
</svelte:head>

<h3>Component rendering reproduction</h3>
<div style="border: 1px solid black; padding: 5px; border-radius: 5px;">
    <div bind:this={divRef}></div>
</div>
