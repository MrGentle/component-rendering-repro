import { compile } from "svelte/compiler";
import * as esbuild from "esbuild";
import { virtualSveltePlugin } from "./wrapper-esbuild-plugin";

interface ComponentBuildOptions {
    
}


export const compileModule = async (code: string, svelteVersion: string, buildOptions: {} = {}, wrapperPath: string = "./src/lib/component-wrapper.ts") => {
    const compiledCode = compile(code, {
        filename: "Template.svelte",    
        css: "injected"
    });

    const buildRes = await esbuild.build({
        entryPoints: [wrapperPath],
        bundle: true,
        outfile: 'component.ts',
        platform: "browser",
        target: "esnext",
        format: "esm",
        minify: false,
        write: false,
        banner: {
            js: "//Wrapped dynamic component with esbuild"
        },
        
        treeShaking: true,
        
        external: ["svelte"],
        plugins: [virtualSveltePlugin(compiledCode.js.code, svelteVersion)]
    });
    

    return buildRes.outputFiles ? buildRes.outputFiles[0].text : "";
}
