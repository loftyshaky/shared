import { Main } from 'error_modules/error/stores/ui/main';

import { i_error } from 'error_modules/internal';

declare global {
    function show_err_ribbon(
        error_obj: any,
        error_code: number | string,
        obj?: i_error.ShowError
    ): void;
    function err<T1>(
        f: () => T1,
        error_code: number | string,
        obj?: i_error.ShowError
    ): T1;
    function err_async<T1>(
        f: () => Promise<T1>,
        error_code: number | string,
        obj?: i_error.ShowError
    ): Promise<T1>;
    function throw_err(msg: string): void;
    function err_obj(msg: string): Error;
}

window.show_err_ribbon = (
    error_obj: any,
    error_code: number | string,
    {
        error_msg_key = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = Main.i.hide_delay,
    }: i_error.ShowError = {},
) => Main.i.show_error(
    error_obj,
    error_code,
    {
        error_msg_key,
        silent,
        persistent,
        exit,
        hide_delay,
    },
);

window.err = <T1>(
    f: () => T1,
    error_code: number | string,
    {
        error_msg_key = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = Main.i.hide_delay,
    }: i_error.ShowError = {},
): T1 => {
    try {
        return f();
    } catch (error_obj) {
        Main.i.show_error(
            error_obj,
            error_code,
            {
                error_msg_key,
                silent,
                persistent,
                exit,
                hide_delay,
            },
        );
    }

    return f();
};

window.err_async = async <T1>(
    f: () => Promise<T1>,
    error_code: number | string,
    {
        error_msg_key = '',
        silent = false,
        persistent = false,
        exit = false,
        hide_delay = Main.i.hide_delay,
    }: i_error.ShowError = {},
): Promise<T1> => {
    try {
        return await f();
    } catch (error_obj) {
        Main.i.show_error(
            error_obj,
            error_code,
            {
                error_msg_key,
                silent,
                persistent,
                exit,
                hide_delay,
            },
        );
    }

    return f();
};

window.throw_err = (msg: string): void => {
    throw new Error(msg);
};

window.err_obj = (msg: string): Error => new Error(msg);
