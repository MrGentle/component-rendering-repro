export const componentWrapper = `
import ComponentBody from 'component-body';
import { hydrate, mount, unmount, type Component } from "svelte";

export default function factory(target: HTMLElement, props: object): DynamicComponent {
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
        },
        setProps: (props: object) => {
            hydrate(ComponentBody, {
                target,
                props
            });
        }
    };
};`

