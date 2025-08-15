<script lang="ts">
	import { onMount } from 'svelte';
	import { load } from '$lib/component-loader.js';

    let { data } = $props();
    let divRef: HTMLElement;

    const svelteVersion = data.svelteVersion;

    onMount(async () => {
        const code = data.js.split("\n");
        code.unshift(`import { mount, unmount } from "svelte";`);

        const exportIndex = code.findIndex(line => line.startsWith("export default"));
        code[exportIndex] = code[exportIndex].replace("export default ", "");

        code.push(`
            var factory = (target, props) => {
                const component = mount(Template, {
                    target,
                    props
                });
                return {
                    component,
                    name: "Template",
                    props,
                    destroy: () => {
                        console.log("entry.ts -> simple.svelte", "destroying component", component);
                        unmount(component);
                    }
                };
            };

            export {
                factory as default
            };
        `)

        const newCode = code.join("\n");

        console.log(newCode); 
        const module = await load(newCode);
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
