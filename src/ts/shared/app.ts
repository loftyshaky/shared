import path from 'path';
import fs from 'fs-extra';

import { d_error } from 'error_modules/internal';

declare const global: Global;

global.page = 'front_end';

export const init_page = (): void =>
    err(() => {
        const title = global.document ? document.querySelector('title') : undefined;

        global.page = n(title) && n(title.dataset.page) ? title.dataset.page : 'front_end';
    }, 'shr_1190');

global.misplaced_dependency = (culprit_page: string): void =>
    err(() => {
        if (page !== culprit_page) {
            const msg: string =
                we.i18n.getMessage('dependencicies_from_other_page_loaded_into_this_page_alert') +
                culprit_page.toUpperCase();

            if (page === 'background') {
                // eslint-disable-next-line no-console
                console.log(msg);
            } else {
                // eslint-disable-next-line no-alert
                alert(msg);
            }
        }
    }, 'shr_1193');

export class App {
    private static i0: App;

    public static i(): App {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private log_error = (error_obj: Error, error_code: string): void => {
        // eslint-disable-next-line no-console
        d_error.Main.i().output_error(error_obj, error_code);
    };

    public get_ext_version = (): string => {
        try {
            const { version } = fs.readJSONSync('package.json');

            return version;
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1191');
        }

        return '';
    };

    public msg = (msg: string): string => {
        try {
            const get_msgs = ({ user_language }: { user_language: string }): any => {
                const messages_path: string = path.join(
                    __dirname,
                    '_locales',
                    user_language,
                    'messages.json',
                );

                if (fs.existsSync(messages_path)) {
                    return fs.readJSONSync(path.join(messages_path));
                }

                return undefined;
            };

            let user_language = 'en';
            const { locale } = Intl.DateTimeFormat().resolvedOptions();
            const is_english = locale.includes('en-');

            if (!is_english) {
                user_language = locale;
            }

            const en_msgs: any = get_msgs({ user_language: 'en' });
            const localized_msgs: any = is_english ? undefined : get_msgs({ user_language });

            let msg_2: string | undefined =
                n(en_msgs[msg]) && n(en_msgs[msg].message) ? en_msgs[msg].message : '';

            if (!is_english) {
                msg_2 =
                    n(localized_msgs) && n(localized_msgs[msg]) && n(localized_msgs[msg].message)
                        ? localized_msgs[msg].message
                        : msg_2;
            }

            return n(msg_2) ? msg_2 : '';
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1192');
        }

        return '';
    };
}
