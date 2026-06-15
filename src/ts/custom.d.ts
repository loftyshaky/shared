// oxlint-disable typescript/consistent-type-imports

declare const self: Window;
declare const document: Document;
declare const location: Location;
declare const crypto: Crypto;
declare var x: typeof import('./shared_clean/x').X;
declare var ext: typeof import('./shared_clean/ext').Ext;
declare var app: typeof import('webextension-polyfill').App;
declare var we: import('webextension-polyfill').Browser;
declare var env: import('./shared_clean/t').Env;
declare var l: CallableFunction;
declare var data: import('./shared_clean/t').Any;
declare var n: <T1>(val: T1 | undefined | null) => val is T1;
declare var nn: <T1>(val: T1 | null) => val is T1;
declare var rs: <T1>(variable: T1) => string;
declare var rn: <T1>(variable: T1) => number;
declare var rb: <T1>(variable: T1) => boolean;
declare var rnb: <T1>(variable: T1) => number;
declare var ru: <T1>(variable: T1) => import('./shared_clean/t').Any;
declare var s: <T1>(selector: string) => T1 | undefined;
declare var sa: <T1 extends HTMLElement>(selector: string) => NodeListOf<T1> | undefined;
declare var sb: <T1>(
    base_el: import('./shared_clean/t').BaseEl,
    selector: string,
) => T1 | undefined;
declare var sab: <T1 extends HTMLElement>(
    base_el: import('./shared_clean/t').BaseEl,
    selector: string,
) => NodeListOf<T1> | undefined;
declare var is_ext: boolean;
declare var we: import('./shared_clean/t').AnyRecord;
declare var page: string;
declare var is_node: boolean;
declare var misplaced_dependency: import('./shared_clean/t').CallbackVariadicVoid;
declare var show_err_ribbon: (
    error_obj: import('./error_modules_clean/error/interfaces/error_obj').ErrorObj | undefined,
    error_code: string | undefined,
    obj?: import('./error_modules_clean/error/interfaces/show_error').ShowError,
) => void;
declare var show_flash: () => void;
declare var show_notification: (
    obj?: import('./error_modules_clean/error/interfaces/show_error').ShowError,
) => void;
declare var show_unable_to_access_settings_error: (
    obj?: import('./error_modules_clean/error/interfaces/show_unable_to_access_settings_error').ShowUnableToAccessSettingsError,
) => void;
declare var err: <T1>(
    f: () => T1,
    error_code: string,
    obj?: import('./error_modules_clean/error/interfaces/show_error').ShowError,
) => T1;
declare var err_async: <T1>(
    f: () => Promise<T1>,
    error_code: string,
    obj?: import('./error_modules_clean/error/interfaces/show_error').ShowError,
) => Promise<T1>;
declare var throw_err: (msg: string) => void;
declare var throw_err_obj: (error_obj: Error) => void;
declare var err_obj: (msg: string) => Error;

declare module '*.svg' {
    const content: import('./shared_clean/t').Any;
    export default content;
}

declare module 'svg-inline-react';
declare module '@simonwep/pickr';
