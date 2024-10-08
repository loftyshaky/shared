import { d_error, i_error } from 'error_modules_clean/internal';

declare const globalThis: Global;

globalThis.show_err_ribbon = (
    error_obj: i_error.ErrorObj | undefined,
    error_code: string | undefined,
    {
        error_msg_key = '',
        alt_msg = '',
        notification_type = 'error',
        hide_delay = d_error.Error.hide_delay,
        silent = false,
        persistent = false,
        exit = false,
        is_fullscreen = false,
        prevent_subsequent_errors = false,
    }: i_error.ShowError = {},
) =>
    d_error.Error.show(error_obj, error_code, {
        error_msg_key,
        alt_msg,
        notification_type,
        silent,
        persistent,
        exit,
        hide_delay,
        is_fullscreen,
        prevent_subsequent_errors,
    });

globalThis.err = <T1>(
    f: () => T1,
    error_code: string,
    {
        error_msg_key = '',
        alt_msg = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = d_error.Error.hide_delay,
        is_fullscreen = false,
        prevent_subsequent_errors = false,
    }: i_error.ShowError = {},
): any => {
    try {
        return f();
    } catch (error_obj: any) {
        d_error.Error.show(error_obj, error_code, {
            error_msg_key,
            alt_msg,
            silent,
            persistent,
            exit,
            hide_delay,
            is_fullscreen,
            prevent_subsequent_errors,
        });
    }

    return undefined;
};

globalThis.err_async = async <T1>(
    f: () => Promise<T1>,
    error_code: string,
    {
        error_msg_key = '',
        alt_msg = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = d_error.Error.hide_delay,
        is_fullscreen = false,
        prevent_subsequent_errors = false,
    }: i_error.ShowError = {},
): Promise<any> => {
    try {
        return await f();
    } catch (error_obj: any) {
        d_error.Error.show(error_obj, error_code, {
            error_msg_key,
            alt_msg,
            silent,
            persistent,
            exit,
            hide_delay,
            is_fullscreen,
            prevent_subsequent_errors,
        });
    }

    return undefined;
};

globalThis.throw_err = (msg: string): void => {
    throw new Error(msg);
};

globalThis.throw_err_obj = (error_obj: Error): void => {
    throw error_obj;
};

globalThis.err_obj = (msg: string): Error => new Error(msg);
