export interface DynamicComponent{
    component: object,
    name: string,
    props: object,
    destroy: () => void,
    setProps: (props: object) => void
}