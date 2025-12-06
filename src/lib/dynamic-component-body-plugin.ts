export const dynamicComponentBodyPlugin = (compiledCode: string, svelteVersion?: string) => {
    const CDN_BASE = `https://esm.sh/svelte@${svelteVersion}`;

    return ({
        name: 'virtual-svelte-plugin',
        setup(build: any) {
            // Intercept and resolve the virtual path
            build.onResolve({ filter: /^component-body$/ }, (args: any) => ({
                path: args.path,
                namespace: 'body'
            }));

            // Load the code from the in-memory string
            build.onLoad({ filter: /.*/, namespace: 'body' }, () => ({
                contents: compiledCode,
                loader: 'ts',
                resolveDir: process.cwd()
            }));

            build.onResolve({ filter: /^svelte(\/.*)?$/ }, (args: any) => {
                if (svelteVersion) {
                const sub = args.path === 'svelte' ? '' : args.path.replace(/^svelte\//, '');
                const url = sub ? `${CDN_BASE}/${sub}.js` : CDN_BASE;
                return { path: url, external: true };
                }
            });
        }
    })
};

