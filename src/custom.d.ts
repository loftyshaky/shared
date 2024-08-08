interface Global {
    self: Window;
    document: Document;
    location: Location;
    crypto: Crypto;
    x: import('shared_clean/x').Class;
    ext: import('shared_clean/ext').Class;
    app: import('shared_clean/app').Class;
    env: import('shared_clean/t').Env;
    l: CallableFunction;
    data: any;
    n: <T1>(val: T1 | undefined | null) => val is T1;
    nn: <T1>(val: T1 | null) => val is T1;
    rs: <T1>(variable: T1) => string;
    rn: <T1>(variable: T1) => number;
    rb: <T1>(variable: T1) => boolean;
    ru: <T1>(variable: T1) => any | undefined;
    s: <T1>(selector: string) => T1 | undefined;
    sa: <T1 extends HTMLElement>(selector: string) => NodeListOf<T1> | undefined;
    sb: <T1>(base_el: import('shared_clean/t').BaseEl, selector: string) => T1 | undefined;
    sab: <T1 extends HTMLElement>(
        base_el: import('shared_clean/t').BaseEl,
        selector: string,
    ) => NodeListOf<T1> | undefined;
    is_ext: boolean;
    we: any;
    page: string;
    is_node: boolean;
    misplaced_dependency: import('shared_clean/t').CallbackVariadicVoid;
    show_err_ribbon: (
        error_obj: import('error_modules_clean/error/interfaces/error_obj').ErrorObj,
        error_code: string,
        obj?: import('error_modules_clean/error/interfaces/show_error').ShowError,
    ) => void;
    show_flash: () => void;
    show_notification: (
        obj?: import('error_modules_clean/error/interfaces/show_error').ShowError,
    ) => void;
    show_unable_to_access_settings_error: (
        obj: import('error_modules_clean/error/interfaces/show_unable_to_access_settings_error').ShowUnableToAccessSettingsError,
    ) => void;
    err: <T1>(
        f: () => T1,
        error_code: string,
        obj?: import('error_modules_clean/error/interfaces/show_error').ShowError,
    ) => T1;
    err_async: <T1>(
        f: () => Promise<T1>,
        error_code: string,
        obj?: import('error_modules_clean/error/interfaces/show_error').ShowError,
    ) => Promise<T1>;
    throw_err(msg: string): void;
    throw_err_obj(error_obj: Error): void;
    err_obj(msg: string): Error;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'svg-inline-react';
declare module '@simonwep/pickr';
