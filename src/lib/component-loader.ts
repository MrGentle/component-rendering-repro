const load = async (code: string) => {
    const url = URL.createObjectURL(new Blob([code], { type: "application/javascript" }));
    const module = await import(/* @vite-ignore */ url);
    return module.default;
}

const loadAndRender = async (code: string, target: HTMLElement, props: object) => {
    try {
        const url = URL.createObjectURL(new Blob([code], { type: "application/javascript" }));
        const module = await import(/* @vite-ignore */ url);
        console.log(module.default);
        console.log(target);
        module.default(target, props);
    } catch (err) {
        console.error(err);
    }
}

export {
    load,
    loadAndRender
}