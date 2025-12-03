//@ts-ignore
import ComponentBody from 'component-body';
import { mount, unmount, type Component } from "svelte";

export default function factory(target: HTMLElement, props: object) {
    const component = mount(ComponentBody as Component, {
        target,
        props
    });
    return {
        component,
        name: "ComponentBody",
        props,
        destroy: () => {
            console.log("Destroying dynamic component", component);
            unmount(component);
        }
    };
};