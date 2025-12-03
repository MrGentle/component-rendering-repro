<script lang="ts">
	import { onMount } from 'svelte';
	import { load } from '$lib/component-loader.js';

    let { data } = $props();
    let moduleWrappedRef: HTMLElement;

    const moduleWrapped = async () => {
        const module = await load(data.code);
        module(moduleWrappedRef, { name: "World"});
    }

    onMount(async () => {
        moduleWrapped();
    })
</script>

<h3>Dynamic component rendering:</h3>
<div style="border: 1px solid #333; padding: 5px; border-radius: 5px;">
    <div bind:this={moduleWrappedRef}></div>
</div>
