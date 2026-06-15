export type XEl = HTMLElement | ShadowRoot | ChildNode | undefined | null;
export type XElNoShadow = HTMLElement | ChildNode | undefined | null;
export type XEls = HTMLElement[] | NodeList | HTMLElement | undefined;
export type Browser = 'chrome' | 'edge' | 'opera' | 'yandex' | 'firefox';
export type BaseEl = Document | ShadowRoot | HTMLElement | undefined;
// oxlint-disable-next-line typescript/no-explicit-any
export type Any = any;
export type AnyUndefined = string | number | boolean | AnyRecord | undefined;
export type AnyArray = string[] | number[] | boolean[] | AnyRecord[];
export type AnyArrayUndefined = string[] | number[] | boolean[] | AnyRecord[] | undefined;
export type AnyRecord = Record<string, Any>;
export type EmptyRecord = Record<string, never>;
export type StringRecord = Record<string, string>;
export type CallbackString = () => string;
export type CallbackNumber = () => number;
export type CallbackBoolean = () => boolean;
export type CallbackUndefined = () => undefined;
export type CallbackAnyObj = () => AnyRecord;
export type CallbackVoid = () => void;
export type CallbackAny = () => Any;
export type CallbackVariadicString = (...args: Any[]) => string;
export type CallbackVariadicNumber = (...args: Any[]) => number;
export type CallbackVariadicBoolean = (...args: Any[]) => boolean;
export type CallbackVariadicUndefined = (...args: Any[]) => undefined;
export type CallbackVariadicAnyObj = (...args: Any[]) => AnyRecord;
export type CallbackVariadicVoid = (...args: Any[]) => void;
export type CallbackVariadicAny = (...args: Any[]) => Any;
export type CallbackStringAsync = () => Promise<string>;
export type CallbackNumberAsync = () => Promise<number>;
export type CallbackBooleanAsync = () => Promise<boolean>;
export type CallbackUndefinedAsync = () => Promise<undefined>;
export type CallbackAnyObjAsync = () => Promise<AnyRecord>;
export type CallbackVoidAsync = () => Promise<void>;
export type CallbackAnyAsync = () => Promise<Any>;
export type CallbackVariadicStringAsync = (...args: Any[]) => Promise<string>;
export type CallbackVariadicNumberAsync = (...args: Any[]) => Promise<number>;
export type CallbackVariadicBooleanAsync = (...args: Any[]) => Promise<boolean>;
export type CallbackVariadicUndefinedAsync = (...args: Any[]) => Promise<undefined>;
export type CallbackVariadicAnyObjAsync = (...args: Any[]) => Promise<AnyRecord>;
export type CallbackVariadicVoidAsync = (...args: Any[]) => Promise<void>;
export type CallbackVariadicAnyAsync = (...args: Any[]) => Promise<Any>;
export type Constructable<T1> = new (args?: T1) => T1;
export interface Env {
    version: string;
    name: string;
    browser: Browser;
    mode: 'development' | 'production';
    env: 'ext' | 'app' | 'adonis_app';
}

export interface Msg {
    [index: string]: Any;
}
