import { compile } from 'svelte/compiler';
import template from '$lib/template.txt?raw';
import lock from "../../package-lock.json";



export const load = async () => {
    const preview = compile(template, {
        filename: "Template.svelte",
        css: "injected"
    });

    const returnData = {
        svelteVersion: lock.packages['node_modules/svelte'].version,
        js: preview.js.code,
        css: preview.css?.code
    }

    return returnData;
}