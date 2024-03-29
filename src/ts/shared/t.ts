export type XEl = HTMLElement | ShadowRoot | ChildNode | undefined | null;
export type XElNoShadow = HTMLElement | ChildNode | undefined | null;
export type XEls = HTMLElement[] | NodeList | HTMLElement | undefined;
export type Browser = 'chrome' | 'edge' | 'opera' | 'firefox';
export type BaseEl = Document | ShadowRoot | HTMLElement | undefined;
export type Any = string | number | boolean | AnyRecord;
export type AnyUndefined = string | number | boolean | AnyRecord | undefined;
export type AnyArray = string[] | number[] | boolean[] | AnyRecord[];
export type AnyArrayUndefined = string[] | number[] | boolean[] | AnyRecord[] | undefined;
export type AnyRecord = Record<string, any>;
export type EmptyRecord = Record<string, never>;
export type StringRecord = Record<string, string>;
export type CallbackString = () => string;
export type CallbackNumber = () => number;
export type CallbackBoolean = () => boolean;
export type CallbackUndefined = () => undefined;
export type CallbackAnyObj = () => AnyRecord;
export type CallbackVoid = () => void;
export type CallbackAny = () => any;
export type CallbackVariadicString = (...args: any[]) => string;
export type CallbackVariadicNumber = (...args: any[]) => number;
export type CallbackVariadicBoolean = (...args: any[]) => boolean;
export type CallbackVariadicUndefined = (...args: any[]) => undefined;
export type CallbackVariadicAnyObj = (...args: any[]) => AnyRecord;
export type CallbackVariadicVoid = (...args: any[]) => void;
export type CallbackVariadicAny = (...args: any[]) => any;
export type Constructable<T1> = new (args?: T1) => T1;
export interface Env {
    version: string;
    browser: Browser;
    mode: 'development' | 'production';
    env: 'ext' | 'app' | 'adonis_app';
}

export interface Msg {
    [index: string]: any;
}
