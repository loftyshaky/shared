import { d_error as d_error_clean, i_error } from 'error_modules_clean/internal';
import { s_error, d_error } from 'error_modules/internal';

declare const globalThis: Global;

globalThis.show_err_ribbon = (
    error_obj: i_error.ErrorObj | undefined,
    error_code: string | undefined,
    {
        error_msg_key = '',
        notification_type = 'error',
        hide_delay = d_error_clean.Main.i().hide_delay,
        silent = false,
        persistent = false,
        exit = false,
        is_fullscreen = false,
        prevent_subsequent_errors = false,
    }: i_error.ShowError = {},
) =>
    d_error.Main.i().show_error(error_obj, error_code, {
        error_msg_key,
        notification_type,
        silent,
        persistent,
        exit,
        hide_delay,
        is_fullscreen,
        prevent_subsequent_errors,
    });

globalThis.show_flash = s_error.Flash.i().show;

globalThis.show_notification = ({
    error_msg_key = '',
    notification_type = 'neutral',
    hide_delay = d_error_clean.Main.i().hide_delay,
    persistent = false,
    is_fullscreen = false,
    prevent_subsequent_errors = false,
}: i_error.ShowError = {}) => {
    s_error.Notification.i().show({
        error_msg_key,
        notification_type,
        hide_delay,
        persistent,
        is_fullscreen,
        prevent_subsequent_errors,
    });
};

globalThis.show_unable_to_access_settings_error = ({
    is_fullscreen = true,
    settings = undefined,
    provided_settings = false,
}: i_error.ShowUnableToAccessSettingsError = {}) => {
    s_error.Notification.i().show_unable_to_access_settings_error({
        is_fullscreen,
        settings,
        provided_settings,
    });
};

globalThis.err = <T1>(
    f: () => T1,
    error_code: string,
    {
        error_msg_key = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = d_error_clean.Main.i().hide_delay,
        is_fullscreen = false,
        prevent_subsequent_errors = false,
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
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = d_error_clean.Main.i().hide_delay,
        is_fullscreen = false,
        prevent_subsequent_errors = false,
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
            is_fullscreen,
            prevent_subsequent_errors,
        });
    }

    return undefined;
};
