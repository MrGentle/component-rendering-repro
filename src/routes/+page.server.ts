import template from '$lib/template.txt?raw';
import lock from "../../package-lock.json";
import { compileModule } from "../lib/component-factory"


export const load = async () => {    
    const code = await compileModule(template, lock.packages['node_modules/svelte'].version);

    return {
        code
    };
}