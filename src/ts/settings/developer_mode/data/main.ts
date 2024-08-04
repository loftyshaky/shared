import { t } from 'shared_clean/internal';

import { makeObservable, action } from 'mobx';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            enable_developer_mode: action,
        });
    }

    private click_count: number = 0;
    private click_timeout: number = 0;

    public enable_developer_mode = ({
        save_callback,
    }: {
        save_callback: t.CallbackVoid;
    }): Promise<void> =>
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
