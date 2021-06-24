import { makeObservable, action } from 'mobx';

import { u_error, i_error } from 'error_modules/internal';

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
        error_obj: any,
        error_code: string,
        {
            error_msg_key = '',
            silent = false,
            persistent = false,
            exit = false,
            hide_delay = this.hide_delay,
        }: i_error.ShowError,
    ): void => {
        const is_browser = global !== undefined;

        if (is_browser && !error_obj.silent && !silent) {
            u_error.Msg.i().change_visibility_of_advanced_msg({ is_visible: false });

            const error_msg_pre = ext.msg(`${error_obj.error_msg || error_msg_key}_error`);
            const error_msg_final = error_msg_pre ? ` ${error_msg_pre}` : '';

            u_error.Msg.i().basic_msg = `${ext.msg('an_error_occured_msg') + error_msg_final}`;
            u_error.Msg.i().advanced_msg = `${
                ext.msg('error_code_label') + (error_obj.error_code || error_code)
            }\n${ext.msg('error_type_label') + error_obj.name}\n${
                ext.msg('error_msg_label') + error_obj.message
            }`;

            u_error.State.i().change_state({
                observable_key: 'is_visible',
                state: true,
            }); // show error ribbon
            u_error.State.i().change_state({
                observable_key: 'is_highlighted',
                state: true,
            }); // highlight error ribbon

            u_error.State.i().clear_all_reset_state_timeouts();

            if (!error_obj.persistent && !persistent) {
                u_error.State.i().run_reset_state_timeout({
                    observable_key: 'is_visible',
                    delay: hide_delay + this.highlight_time,
                });
            }

            u_error.State.i().run_reset_state_timeout({
                observable_key: 'is_highlighted',
                delay: this.highlight_time,
            });
        }

        if (error_obj.exit || exit) {
            const updated_error_obj = error_obj;

            const set_updated_error_obj_propery = ({
                key,
                undefined_property,
            }: {
                key: string;
                undefined_property: boolean | string | number;
            }): void => {
                updated_error_obj[key] = n(error_obj[key]) ? error_obj[key] : undefined_property;
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
            //> console output
            const line =
                '--------------------------------------------------------------------------------';
            const separator_top = is_browser ? '' : `${line}\n`;
            const separator_bottom = is_browser ? '' : `\n${line}`;
            const error_code_and_msg = `${separator_top}Code: ${error_code}\nMessage: ${error_obj.message}`;
            const console_output = error_obj.stack
                ? `${error_code_and_msg}\nStack: ${error_obj.stack + separator_bottom}`
                : error_code_and_msg + separator_bottom;
            //< console output

            // eslint-disable-next-line no-console
            console.error(console_output);
        }
    };
}
