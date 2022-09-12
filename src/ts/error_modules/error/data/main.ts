import { makeObservable, action, runInAction } from 'mobx';

import { d_error, i_error } from 'error_modules/internal';

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

    public hide_delay: number = 5000;
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
            hide_delay = this.hide_delay,
            silent = false,
            persistent = false,
            exit = false,
        }: i_error.ShowError = {},
    ): void => {
        const error_ui_is_visible: boolean =
            !x.in_service_worker && !silent && (!error_obj || !error_obj.silent);

        if (error_ui_is_visible) {
            if (notification_type !== 'error') {
                d_error.Msg.i().basic_msg = ext.msg(error_msg_key);
                d_error.State.i().notification_type = notification_type;
            }

            d_error.State.i().change_state({
                observable_key: 'is_visible',
                state: true,
            }); // show error ribbon
            d_error.State.i().change_state({
                observable_key: 'is_highlighted',
                state: true,
            }); // highlight error ribbon

            d_error.State.i().clear_all_reset_state_timeouts();

            if ((!error_obj || !error_obj.persistent) && !persistent) {
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

        if (error_obj && error_code) {
            if (error_ui_is_visible) {
                d_error.Msg.i().change_visibility_of_advanced_msg({ is_visible: false });
            }

            const error_msg_pre = ext.msg(`${error_obj.error_msg || error_msg_key}_error`);
            const error_msg_final = error_msg_pre ? ` ${error_msg_pre}` : '';

            runInAction(() =>
                err(() => {
                    d_error.Msg.i().basic_msg = `${
                        ext.msg('an_error_occured_msg') + error_msg_final
                    }`;
                    d_error.Msg.i().advanced_msg = `${
                        ext.msg('error_code_label') + (error_obj.error_code || error_code)
                    }\n${ext.msg('error_type_label') + error_obj.name}\n${
                        ext.msg('error_msg_label') + error_obj.message
                    }`;
                }, 'shr_1195'),
            );

            if (error_obj.exit || exit) {
                const updated_error_obj: i_error.ErrorObj = error_obj;

                const set_updated_error_obj_propery = ({
                    key,
                    undefined_property,
                }: {
                    key: string;
                    undefined_property: boolean | string | number;
                }): void => {
                    (updated_error_obj[key as keyof i_error.ErrorObj] as
                        | string
                        | number
                        | boolean
                        | undefined) = n(error_obj[key as keyof i_error.ErrorObj])
                        ? error_obj[key as keyof i_error.ErrorObj]
                        : undefined_property;
                };

                set_updated_error_obj_propery({
                    key: 'error_code',
                    undefined_property: error_code,
                });
                set_updated_error_obj_propery({
                    key: 'error_msg',
                    undefined_property: error_msg_key,
                });
                set_updated_error_obj_propery({
                    key: 'silent',
                    undefined_property: silent,
                });
                set_updated_error_obj_propery({
                    key: 'persistent',
                    undefined_property: persistent,
                });
                set_updated_error_obj_propery({
                    key: 'exit',
                    undefined_property: exit,
                });
                set_updated_error_obj_propery({
                    key: 'hide_delay',
                    undefined_property: hide_delay,
                });

                throw updated_error_obj;
            } else {
                this.output_error(error_obj, error_code);
            }
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
