import { d_error, i_error } from 'error_modules/internal';

declare const global: Global;

declare global {
    function show_err_ribbon(
        error_obj: i_error.ErrorObj | undefined,
        error_code: string | undefined,
        obj?: i_error.ShowError,
    ): void;
    function err<T1>(f: () => T1, error_code: string, obj?: i_error.ShowError): T1;
    function err_async<T1>(
        f: () => Promise<T1>,
        error_code: string,
        obj?: i_error.ShowError,
    ): Promise<T1>;
    function throw_err(msg: string): void;
    function throw_err_obj(msg: string): void;
    function err_obj(msg: string): Error;
}

global.show_err_ribbon = (
    error_obj: i_error.ErrorObj | undefined,
    error_code: string | undefined,
    {
        error_msg_key = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = d_error.Main.i().hide_delay,
        is_notification = false,
        notification_msg_key = '',
    }: i_error.ShowError = {},
) =>
    d_error.Main.i().show_error(error_obj, error_code, {
        error_msg_key,
        silent,
        persistent,
        exit,
        hide_delay,
        is_notification,
        notification_msg_key,
    });

global.err = <T1>(
    f: () => T1,
    error_code: string,
    {
        error_msg_key = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = d_error.Main.i().hide_delay,
    }: i_error.ShowError = {},
): any => {
    try {
        return f();
    } catch (error_obj: any) {
        d_error.Main.i().show_error(error_obj, error_code, {
            error_msg_key,
            silent,
            persistent,
            exit,
            hide_delay,
        });
    }

    return undefined;
};

global.err_async = async <T1>(
    f: () => Promise<T1>,
    error_code: string,
    {
        error_msg_key = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = d_error.Main.i().hide_delay,
    }: i_error.ShowError = {},
): Promise<any> => {
    try {
        return await f();
    } catch (error_obj: any) {
        d_error.Main.i().show_error(error_obj, error_code, {
            error_msg_key,
            silent,
            persistent,
            exit,
            hide_delay,
        });
    }

    return undefined;
};

global.throw_err = (msg: string): void => {
    throw new Error(msg);
};

global.throw_err_obj = (error_obj: Error): void => {
    throw error_obj;
};

global.err_obj = (msg: string): Error => new Error(msg);
