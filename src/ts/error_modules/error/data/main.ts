import { makeObservable, action, runInAction } from 'mobx';

import { d_error as d_error_clean, i_error } from 'error_modules_clean/internal';
import { d_error } from 'error_modules/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            show_error: action,
        });
    }

    private highlight_time: number = 300;
    /*
    error_msg_key = a key to access to localized version of error message in [locale] messages.json file
    silent = don't show (true) / show (false) error ribbon
    persistent = don't hide (true) / hide (false) error ribbon after 5 seconds
    exit = terminate code execution (true) / show error message; don't terminate code execution (false)
    */

    public show_error = (
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
    ): void => {
        d_error_clean.Main.i().show_error(error_obj, error_code, {
            error_msg_key,
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
            notification_type,
            hide_delay,
            is_fullscreen,
            error_ui_is_visible,
            persistent_final,
        }: i_error.ShowErrorState1,
    ): void => {
        if (error_ui_is_visible) {
            if (notification_type !== 'error') {
                d_error.Msg.i().basic_msg = ext.msg(error_msg_key);
                d_error.State.i().notification_type = notification_type;
            }

            if (is_fullscreen) {
                d_error.State.i().change_state({
                    observable_key: 'is_fullscreen',
                    state: true,
                }); // show error ribbon
            }
            d_error.State.i().change_state({
                observable_key: 'is_visible',
                state: true,
            }); // show error ribbon
            if (!is_fullscreen) {
                d_error.State.i().change_state({
                    observable_key: 'is_highlighted',
                    state: true,
                }); // highlight error ribbon
            }

            d_error.State.i().clear_all_reset_state_timeouts();

            if ((!error_obj || !error_obj.persistent) && !persistent_final) {
                d_error.State.i().run_reset_state_timeout({
                    observable_key: 'is_visible',
                    delay: hide_delay + this.highlight_time,
                });
            }

            d_error.State.i().run_reset_state_timeout({
                observable_key: 'is_highlighted',
                delay: this.highlight_time,
            });
        }
    };

    private show_error_state_2 = (
        error_obj: i_error.ErrorObj | undefined,
        error_code: string | undefined,
        { error_msg_key, error_ui_is_visible, silent_final }: i_error.ShowErrorState2,
    ): void => {
        if (error_obj && error_code) {
            if (error_ui_is_visible) {
                d_error.Msg.i().change_visibility_of_advanced_msg({ is_visible: false });
            }

            const error_msg_pre = ext.msg(`${error_obj.error_msg || error_msg_key}_error`);
            const error_msg_final = error_msg_pre ? ` ${error_msg_pre}` : '';

            runInAction(() =>
                err(() => {
                    if (!silent_final) {
                        d_error.Msg.i().basic_msg = `${
                            ext.msg('an_error_occured_msg') + error_msg_final
                        }`;
                        d_error.Msg.i().advanced_msg = `${
                            ext.msg('error_code_label') + (error_obj.error_code || error_code)
                        }\n${ext.msg('error_type_label') + error_obj.name}\n${
                            ext.msg('error_msg_label') + error_obj.message
                        }`;
                    }
                }, 'shr_1195'),
            );
        }
    };

    public output_error = (error_obj: i_error.ErrorObj, error_code: string): void => {
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
