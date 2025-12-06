<script lang="ts">
	import { onMount } from 'svelte';
	import { load } from '$lib/component-loader.js';
	import type { DynamicComponent } from '$lib/types.js';

    let { data } = $props();
    let mountRef: HTMLElement;
    let dynamicComponent: DynamicComponent;
    let counter = $state(0);

    onMount(async () => {
        dynamicComponent = await load(data.clientModule, mountRef, { counter });
    })
</script>

<h3>Dynamic component rendering:</h3>
<div style="border: 1px solid #333; padding: 5px; border-radius: 5px;">
    <div bind:this={mountRef}></div>
</div>
<br>
<button onclick={() => { dynamicComponent && dynamicComponent.setProps({ counter: ++counter }) }}>Increment counter</button>
