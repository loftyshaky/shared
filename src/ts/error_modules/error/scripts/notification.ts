import { d_error, i_error } from 'error_modules_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public show = ({
        error_msg_key = '',
        alt_msg = '',
        notification_type = 'neutral',
        hide_delay = d_error.Error.hide_delay,
        persistent = false,
        is_fullscreen = false,
        prevent_subsequent_errors = false,
    }: i_error.ShowError): void =>
        err(() => {
            show_err_ribbon(undefined, undefined, {
                error_msg_key,
                alt_msg,
                notification_type,
                hide_delay,
                persistent,
                is_fullscreen,
                prevent_subsequent_errors,
            });
        }, 'shr_1253');

    public show_unable_to_access_settings_error = async ({
        is_fullscreen = true,
    }: i_error.ShowUnableToAccessSettingsError = {}): Promise<void> => {
        if (!x.prefs_are_filled()) {
            show_notification({
                error_msg_key: 'unable_to_access_settings_error',
                notification_type: 'negative',
                is_fullscreen,
                prevent_subsequent_errors: true,
            });
        }
    };
}

export const Notification = Class.get_instance();
