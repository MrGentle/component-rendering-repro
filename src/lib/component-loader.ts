const load = async (code: string) => {
    const url = URL.createObjectURL(new Blob([code], { type: "application/javascript" }));
    const module = await import(/* @vite-ignore */ url);
    return module.default;
}

export {
    load
}