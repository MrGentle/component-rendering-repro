// virtual-wrapper-plugin.js
export function dynamicComponentWrapperPlugin(wrapperSource: string) {
    return {
        name: 'virtual-wrapper',
        setup(build: any) {
            build.onResolve({ filter: /^virtual:wrapper$/ }, () => ({ path: 'virtual:wrapper', namespace: 'virtual' }));
            build.onLoad({ filter: /.*/, namespace: 'virtual' }, () => ({ contents: wrapperSource, loader: 'ts' }));
        }
    }
}