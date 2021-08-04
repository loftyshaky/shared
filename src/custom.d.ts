interface Global {
    window: Window;
    document: Document;
    location: Location;
    crypto: Crypto;
    x: import('shared/x').X;
    ext: import('shared/ext').Ext;
    app: import('shared/app').App;
    env: {
        browser: import('shared/t').Browser;
    };
    l: CallableFunction;
    data: any;
    n: <T1>(val: T1 | undefined | null) => val is T1;
    nn: <T1>(val: T1 | null) => val is T1;
    rs(variable: import('shared/t').CallbackVariadicString | string | undefined): string;
    rn(variable: import('shared/t').CallbackVariadicNumber | number | undefined): number;
    rb(variable: import('shared/t').CallbackVariadicBoolean | boolean | undefined): boolean;
    ru(variable: import('shared/t').CallbackVariadicUndefined | undefined): undefined;
    s: <T1>(selector: string) => T1 | undefined;
    sa: <T1 extends HTMLElement>(selector: string) => NodeListOf<T1> | undefined;
    sb: <T1>(base_el: import('shared/t').BaseEl, selector: string) => T1 | undefined;
    sab: <T1 extends HTMLElement>(
        base_el: import('shared/t').BaseEl,
        selector: string,
    ) => NodeListOf<T1> | undefined;
    is_ext: boolean;
    we: any;
    page: string;
    misplaced_dependency: import('shared/t').CallbackVariadicVoid;
    show_err_ribbon: (
        error_obj: import('error_modules/error/interfaces/error_obj').ErrorObj,
        error_code: string,
        obj?: import('error_modules/error/interfaces/show_error').ShowError,
    ) => void;
    err: <T1>(
        f: () => T1,
        error_code: string,
        obj?: import('error_modules/error/interfaces/show_error').ShowError,
    ) => T1;
    err_async: <T1>(
        f: () => Promise<T1>,
        error_code: string,
        obj?: import('error_modules/error/interfaces/show_error').ShowError,
    ) => Promise<T1>;
    throw_err(msg: string): void;
    err_obj(msg: string): Error;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'svg-inline-react';
declare module '@simonwep/pickr';
