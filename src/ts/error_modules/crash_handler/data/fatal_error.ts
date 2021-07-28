import { t } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public catch_fatal_error = async (callback: t.CallbackVoid): Promise<void> => {
        if (page === 'background') {
            callback();
        } else if (is_ext) {
            const background_page_is_available: boolean = await ext.send_msg_resp({
                msg: 'check_if_background_page_is_available',
            });

            if (background_page_is_available) {
                callback();
            }
        } else {
            callback();
        }
    };
}
