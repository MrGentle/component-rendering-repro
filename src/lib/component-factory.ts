import { compile } from "svelte/compiler";
import * as esbuild from "esbuild";
import { dynamicComponentBodyPlugin } from "./dynamic-component-body-plugin";
import { randomUUID } from "node:crypto";
import { dynamicComponentWrapperPlugin } from "./dynamic-component-wrapper-plugin";
import { componentWrapper } from "./component-wrapper";

interface ComponentBuildOptions {
    moduleIdentifier?: string,
    minify?: boolean,
    treeShaking?: boolean,
    customWrapper?: string
}

export const compileModule = async (code: string, svelteVersion: string, buildOptions: ComponentBuildOptions = { minify: false, treeShaking: true }) => {
    let id = randomUUID();

    const clientCompiledCode = compile(code, {
        filename: buildOptions.moduleIdentifier ? `${buildOptions.moduleIdentifier}.svelte` : `Template_${id}.svelte`,    
        css: "injected"
    });

    const clientBuildRes = await esbuild.build({  
        entryPoints: ["virtual:wrapper"],
        bundle: true,
        outfile: buildOptions.moduleIdentifier ? `${buildOptions.moduleIdentifier}.ts` : `component_${id}.ts`,
        platform: "browser",
        target: "esnext",
        format: "esm",
        minify: buildOptions.minify,
        write: false,
        banner: {
            js: "//Wrapped dynamic component with esbuild"
        },
        
        treeShaking: buildOptions.treeShaking,
        
        external: ["svelte"],
        plugins: [dynamicComponentWrapperPlugin(componentWrapper), dynamicComponentBodyPlugin(clientCompiledCode.js.code, svelteVersion)]
    });
    

    return {
        client: clientBuildRes.outputFiles ? clientBuildRes.outputFiles[0].text : "",
    };
}
