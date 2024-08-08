import { t } from 'shared_clean/internal';

import { makeObservable, action } from 'mobx';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            enable: action,
        });
    }

    private click_count: number = 0;
    private click_timeout: number = 0;

    public enable = ({ save_callback }: { save_callback: t.CallbackVoid }): Promise<void> =>
        err_async(async () => {
            clearTimeout(this.click_timeout);

            this.increment_click_count();

            this.click_timeout = window.setTimeout(this.reset_click_count, 500);

            if (this.click_count >= 10) {
                this.reset_click_count();

                data.settings.developer_mode = true;

                show_notification({ error_msg_key: 'youre_now_a_developer_notification' });

                await save_callback();
            }
        }, 'shr_1266');

    private increment_click_count = (): void =>
        err(() => {
            this.click_count += 1;
        }, 'shr_1267');

    private reset_click_count = (): void =>
        err(() => {
            this.click_count = 0;
        }, 'shr_1267');
}

export const DeveloperMode = Class.get_instance();
