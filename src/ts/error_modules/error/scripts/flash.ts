import { i_error } from 'error_modules_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private get_flash_server_text = (): string | undefined =>
        err(() => {
            const flash_server_els = sa<HTMLDivElement>('.flash_server');
            if (n(flash_server_els)) {
                const defined_flash_server_el: HTMLDivElement | undefined = [
                    ...flash_server_els,
                ].find((flash_server_el: HTMLDivElement): boolean => {
                    if (n(flash_server_el) && n(flash_server_el.textContent)) {
                        const flash_server_el_text: string = flash_server_el.textContent;

                        if (flash_server_el_text !== 'undefined') {
                            return true;
                        }
                    }

                    return false;
                });

                if (n(defined_flash_server_el) && n(defined_flash_server_el.textContent)) {
                    return defined_flash_server_el.textContent;
                }

                return undefined;
            }

            return undefined;
        }, 'shr_1246');

    private turn_flash_server_text_into_arr = (): string[] | undefined =>
        err(() => {
            const flash_server_el_text: string | undefined = this.get_flash_server_text();

            if (flash_server_el_text) {
                return flash_server_el_text.split(':');
            }

            return undefined;
        }, 'shr_1250');

    private get_flash_msg_key = (): string | undefined =>
        err(() => {
            const flash_server_arr: string[] | undefined = this.turn_flash_server_text_into_arr();

            if (n(flash_server_arr)) {
                return flash_server_arr[0];
            }

            return undefined;
        }, 'shr_1249');

    private get_flash_type = (): i_error.NotificationType =>
        err(() => {
            const flash_server_arr: string[] | undefined = this.turn_flash_server_text_into_arr();

            return (
                n(flash_server_arr) && n(flash_server_arr[1]) && flash_server_arr[1] !== '-'
                    ? flash_server_arr[1]
                    : 'neutral'
            ) as i_error.NotificationType;
        }, 'shr_1249');

    private get_flash_hide_delay = (): number =>
        err(() => {
            const flash_server_arr: string[] | undefined = this.turn_flash_server_text_into_arr();

            return n(flash_server_arr) && n(flash_server_arr[2]) && flash_server_arr[2] !== '-'
                ? +flash_server_arr[2]
                : 5000;
        }, 'shr_1249');

    public show = (): void =>
        err(() => {
            const flash_msg_key: string | undefined = this.get_flash_msg_key();
            const flash_type: i_error.NotificationType = this.get_flash_type();
            const flash_hide_delay: number = this.get_flash_hide_delay();

            const flash_found: boolean = n(flash_msg_key);

            if (flash_found) {
                show_notification({
                    error_msg_key: flash_msg_key,
                    notification_type: flash_type,
                    hide_delay: flash_hide_delay,
                });
            }
        }, 'shr_1252');
}

export const Flash = Class.get_instance();
