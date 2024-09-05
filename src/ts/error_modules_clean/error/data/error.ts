import { i_error } from 'error_modules_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public hide_delay: number = 5000;
    private prevent_subsequent_errors: boolean = false;
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
            hide_delay = this.hide_delay,
            silent = false,
            persistent = false,
            exit = false,
            is_fullscreen = false,
            prevent_subsequent_errors = false,
            show_error_state_1,
            show_error_state_2,
        }: i_error.ShowError = {},
    ): void => {
        const prevent_subsequent_errors_final =
            prevent_subsequent_errors || this.prevent_subsequent_errors;
        const silent_final: boolean = prevent_subsequent_errors_final
            ? this.prevent_subsequent_errors
            : silent;
        const persistent_final: boolean = prevent_subsequent_errors_final ? true : persistent;
        const error_ui_is_visible: boolean =
            !x.in_service_worker && !silent_final && (!error_obj || !error_obj.silent);

        if (n(show_error_state_1)) {
            show_error_state_1(error_obj, {
                error_msg_key,
                alt_msg,
                notification_type,
                hide_delay,
                is_fullscreen,
                error_ui_is_visible,
                persistent_final,
                prevent_subsequent_errors,
            });
        }

        if (error_obj && error_code) {
            if (n(show_error_state_2)) {
                show_error_state_2(error_obj, error_code, {
                    error_msg_key,
                    alt_msg,
                    error_ui_is_visible,
                    silent_final,
                });
            }

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
                    undefined_property: error_msg_key || alt_msg,
                });
                set_updated_error_obj_propery({
                    key: 'silent',
                    undefined_property: silent_final,
                });
                set_updated_error_obj_propery({
                    key: 'persistent',
                    undefined_property: persistent_final,
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
                this.output(error_obj, error_code);
            }
        }

        if (prevent_subsequent_errors) {
            this.prevent_subsequent_errors = true;
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
