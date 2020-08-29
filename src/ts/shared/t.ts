export type Browser = 'chrome' | 'edge' | 'opera' | 'firefox';
export type BaseEl = Document | ShadowRoot | HTMLElement | undefined;
export type CallbackVoid = () => void;
export type CallbackAny = () => any;
export type CallbackVariadicVoid = (...args: any[]) => void;
export type CallbackVariadicAny = (...args: any[]) => any;
export type Constructable<T1> = new (args?: T1) => T1;
export interface Msg {
    [index: string]: any;
    msg: string;
}
