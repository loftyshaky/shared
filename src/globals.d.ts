declare const x: import('./ts/shared_clean/x').Class;
declare const ext: import('./ts/shared_clean/ext').Class;
declare const app: import('./ts/shared_clean/app').Class;
declare const env: import('./ts/shared_clean/t').Env;
declare const l: CallableFunction;
declare const data: any;
declare const n: <T1>(val: T1 | undefined | null) => val is T1;
declare const nn: <T1>(val: T1 | null) => val is T1;
declare const rs: <T1>(variable: T1) => string;
declare const rn: <T1>(variable: T1) => number;
declare const rb: <T1>(variable: T1) => boolean;
declare const ru: <T1>(variable: T1) => any | undefined;
declare const s: <T1>(selector: string) => T1 | undefined;
declare const sa: <T1 extends HTMLElement>(selector: string) => NodeListOf<T1> | undefined;
declare const sb: <T1>(
    base_el: import('./ts/shared_clean/t').BaseEl,
    selector: string,
) => T1 | undefined;
declare const sab: <T1 extends HTMLElement>(
    base_el: import('./ts/shared_clean/t').BaseEl,
    selector: string,
) => NodeListOf<T1> | undefined;
declare const is_ext: boolean;
declare const we: any;
declare const page: string;
declare const is_node: boolean;
declare const misplaced_dependency: import('./ts/shared_clean/t').CallbackVariadicVoid;
declare const show_err_ribbon: (
    error_obj: import('./ts/error_modules_clean/error/interfaces/error_obj').ErrorObj | undefined,
    error_code: string | undefined,
    obj?: import('./ts/error_modules_clean/error/interfaces/show_error').ShowError,
) => void;
declare const show_flash: () => void;
declare const show_notification: (
    obj?: import('./ts/error_modules_clean/error/interfaces/show_error').ShowError,
) => void;
declare const show_unable_to_access_settings_error: (
    obj?: import('./ts/error_modules_clean/error/interfaces/show_unable_to_access_settings_error').ShowUnableToAccessSettingsError,
) => void;
declare const err: <T1>(
    f: () => T1,
    error_code: string,
    obj?: import('./ts/error_modules_clean/error/interfaces/show_error').ShowError,
) => T1;
declare const err_async: <T1>(
    f: () => Promise<T1>,
    error_code: string,
    obj?: import('./ts/error_modules_clean/error/interfaces/show_error').ShowError,
) => Promise<T1>;
declare const throw_err: (msg: string) => void;
declare const throw_err_obj: (error_obj: Error) => void;
declare const err_obj: (msg: string) => Error;
