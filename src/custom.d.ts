interface Window {
    x: import('shared/x').X,
    ext: import('shared/ext').Ext,
    env: {
        browser: import('shared/t').Browser
    };
    l: any;
    data: any;
    n: <T1>(val: T1 | undefined | null) => val is T1;
    nu: <T1>(val: T1 | null) => val is T1;
    ru(f: import('shared/t').CallbackVariadicAny | undefined): any;
    rb(f: import('shared/t').CallbackVariadicAny | undefined): any;
    rs(f: import('shared/t').CallbackVariadicAny | undefined): any;
    s: <T1>(selector: string) => T1 | undefined;
    sa: <T1 extends HTMLElement>(selector: string) => NodeListOf<T1> | undefined;
    sb: <T1>(base_el: import('shared/t').BaseEl, selector: string) => T1 | undefined;
    sab: <T1 extends HTMLElement>(
        base_el: import('shared/t').BaseEl,
        selector: string
    ) => NodeListOf<T1> | undefined;
    page: string;
    misplaced_dependency: import('shared/t').CallbackVariadicVoid;
    show_err_ribbon: (
        error_obj: any,
        error_code: number | string,
        obj?: import('error_modules/error/interfaces/show_error').ShowError
    ) => void;
    err: <T1>(
        f: () => T1,
        error_code: number | string,
        obj?: import('error_modules/error/interfaces/show_error').ShowError
    ) => T1;
    err_async: <T1>(
        f: () => Promise<T1>,
        error_code: number | string,
        obj?: import('error_modules/error/interfaces/show_error').ShowError
    ) => Promise<T1>;
    throw_err(msg: string): void;
    err_obj(msg: string): Error;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'svg-inline-react';
