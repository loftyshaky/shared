import { d_error, s_error, i_error } from 'error_modules/internal';

declare const globalThis: Global;

declare global {
    function show_err_ribbon(
        error_obj: i_error.ErrorObj | undefined,
        error_code: string | undefined,
        obj?: i_error.ShowError,
    ): void;
    function show_flash(): void;
    function show_notification(obj?: i_error.ShowError): void;
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

globalThis.show_err_ribbon = (
    error_obj: i_error.ErrorObj | undefined,
    error_code: string | undefined,
    {
        error_msg_key = '',
        notification_type = 'error',
        hide_delay = d_error.Main.i().hide_delay,
        silent = false,
        persistent = false,
        exit = false,
    }: i_error.ShowError = {},
) =>
    d_error.Main.i().show_error(error_obj, error_code, {
        error_msg_key,
        notification_type,
        silent,
        persistent,
        exit,
        hide_delay,
    });

globalThis.show_flash = s_error.Flash.i().show;

globalThis.show_notification = ({
    error_msg_key = '',
    notification_type = 'neutral',
    hide_delay = d_error.Main.i().hide_delay,
    persistent = false,
}: i_error.ShowError = {}) =>
    s_error.Notification.i().show({
        error_msg_key,
        notification_type,
        hide_delay,
        persistent,
    });

globalThis.err = <T1>(
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

globalThis.err_async = async <T1>(
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

globalThis.throw_err = (msg: string): void => {
    throw new Error(msg);
};

globalThis.throw_err_obj = (error_obj: Error): void => {
    throw error_obj;
};

globalThis.err_obj = (msg: string): Error => new Error(msg);
