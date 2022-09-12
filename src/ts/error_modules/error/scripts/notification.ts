import { d_error, i_error } from 'error_modules/internal';

export class Notification {
    private static i0: Notification;

    public static i(): Notification {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public show = ({
        error_msg_key = '',
        notification_type = 'neutral',
        hide_delay = d_error.Main.i().hide_delay,
        persistent = false,
    }: i_error.ShowError): void =>
        err(() => {
            show_err_ribbon(undefined, undefined, {
                error_msg_key,
                notification_type,
                hide_delay,
                persistent,
            });
        }, 'shr_1253');
}
