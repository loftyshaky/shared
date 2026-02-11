import { makeObservable, action, runInAction } from 'mobx';

import { d_error as d_error_clean, i_error } from 'error_modules_clean/internal';
import { d_error } from 'error_modules/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            show: action,
        });
    }

    private highlight_time: number = 300;
    /*
    error_msg_key = a key to access to localized version of error message in [locale] messages.json file
    silent = don't show (true) / show (false) error ribbon
    persistent = don't hide (true) / hide (false) error ribbon after 5 seconds
    exit = terminate code execution (true) / show error message; don't terminate code execution (false)
    */

    public show = (
        error_obj: i_error.ErrorObj | undefined,
        error_code: string | undefined,
        {
            error_msg_key = '',
            alt_msg = '',
            notification_type = 'error',
            hide_delay = d_error_clean.Error.hide_delay,
            silent = false,
            persistent = false,
            exit = false,
            is_fullscreen = false,
            prevent_subsequent_errors = false,
        }: i_error.ShowError = {},
    ): void => {
        d_error_clean.Error.show(error_obj, error_code, {
            error_msg_key,
            alt_msg,
            notification_type,
            hide_delay,
            silent,
            persistent,
            exit,
            is_fullscreen,
            prevent_subsequent_errors,
            show_error_state_1: this.show_error_state_1,
            show_error_state_2: this.show_error_state_2,
        });
    };

    private show_error_state_1 = (
        error_obj: i_error.ErrorObj | undefined,
        {
            error_msg_key,
            alt_msg,
            notification_type,
            hide_delay,
            is_fullscreen,
            error_ui_is_visible,
            persistent_final,
        }: i_error.ShowErrorState1,
    ): void => {
        if (error_ui_is_visible) {
            d_error.Msg.basic_msg =
                (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(error_msg_key) ||
                alt_msg;
            d_error.State.notification_type = notification_type;

            if (is_fullscreen) {
                d_error.State.change_state({
                    observable_key: 'is_fullscreen',
                    state: true,
                }); // show error ribbon
            }
            d_error.State.change_state({
                observable_key: 'is_visible',
                state: true,
            }); // show error ribbon
            if (!is_fullscreen) {
                d_error.State.change_state({
                    observable_key: 'is_highlighted',
                    state: true,
                }); // highlight error ribbon
            }

            d_error.State.clear_all_reset_state_timeouts();

            if ((!error_obj || !error_obj.persistent) && !persistent_final) {
                d_error.State.run_reset_state_timeout({
                    observable_key: 'is_visible',
                    delay: hide_delay + this.highlight_time,
                });
            }

            d_error.State.run_reset_state_timeout({
                observable_key: 'is_highlighted',
                delay: this.highlight_time,
            });
        }
    };

    private show_error_state_2 = (
        error_obj: i_error.ErrorObj | undefined,
        error_code: string | undefined,
        { error_msg_key, alt_msg, error_ui_is_visible, silent_final }: i_error.ShowErrorState2,
    ): void => {
        if (error_obj && error_code) {
            if (error_ui_is_visible) {
                d_error.Msg.change_visibility_of_advanced_msg({ is_visible: false });
            }

            const error_msg_pre =
                (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                    `${error_obj.error_msg || error_msg_key}_error`,
                ) || alt_msg;
            const error_msg_final = error_msg_pre ? ` ${error_msg_pre}` : '';

            runInAction(() =>
                err(() => {
                    if (!silent_final) {
                        d_error.Msg.basic_msg = `${
                            (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                                'an_error_occured_msg',
                            ) + error_msg_final
                        }`;
                        d_error.Msg.advanced_msg = `${
                            (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                                'error_code_label',
                            ) + (error_obj.error_code || error_code)
                        }\n${(globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg('error_type_label') + error_obj.name}\n${
                            (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                                'error_msg_label',
                            ) + error_obj.message
                        }`;
                    }
                }, 'shr_1195'),
            );
        }
    };

    public output = (error_obj: i_error.ErrorObj, error_code: string): void => {
        const line = '---------------------------';
        const separator_top = `${line}\n`;
        const separator_bottom = `\n${line}`;
        const error_code_and_msg = `${separator_top}Code: ${error_code}\nMessage: ${error_obj.message}`;
        const console_output = error_obj.stack
            ? `${error_code_and_msg}\nStack: ${error_obj.stack + separator_bottom}`
            : error_code_and_msg + separator_bottom;
        //< console output

        // eslint-disable-next-line no-console
        console.error(console_output);
    };
}

export const Error = Class.get_instance();
