import { d_error } from 'error_modules/internal';
import { t } from 'shared/internal';

declare const globalThis: Global;

globalThis.page = 'front_end';

globalThis.is_node = typeof process !== 'undefined' && process.release.name === 'node';

export const init_page = (): void =>
    err(() => {
        const title = globalThis.document ? document.querySelector('title') : undefined;

        globalThis.page = n(title) && n(title.dataset.page) ? title.dataset.page : 'back_end';
    }, 'shr_1190');

globalThis.misplaced_dependency = (culprit_page: string): void =>
    err(() => {
        if (page !== culprit_page) {
            const msg: string = `DEPENDENCIES FROM THE OTHER PAGE ACCIDENTALLY LOADED INTO THIS PAGE!!!\nCULPRIT PAGE: ${culprit_page.toUpperCase()}`;

            if (page === 'back_end') {
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

    [index: string]: any;

    private origin: string = globalThis.location ? globalThis.location.origin : '';
    private package_json: undefined | t.AnyRecord;
    private messages_en_json: undefined | t.AnyRecord;
    private messages_ru_json: undefined | t.AnyRecord;
    private messages_de_json: undefined | t.AnyRecord;

    private resolve = (path_to_resolve: string): string => {
        try {
            // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
            const path = require('path');
            // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
            const fs = require('fs-extra');

            if (fs.existsSync(path.resolve('dist', path_to_resolve))) {
                return path.resolve('dist', path_to_resolve);
            }

            return path.resolve(path_to_resolve);
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1234');
        }

        return '';
    };

    public read_data_into_vars = async (): Promise<string> => {
        try {
            const set_messages_json = async ({ locale }: { locale: string }): Promise<void> => {
                try {
                    const path: string = `${this.origin}/_locales/${locale}/messages.json`;
                    const response_head = await fetch(path, { method: 'HEAD' });
                    if (response_head.ok) {
                        const response_messages_json = await fetch(path);

                        this[`messages_${locale}_json`] = await response_messages_json.json();
                    }
                } catch (error_obj: any) {
                    this.log_error(error_obj, 'shr_1233');
                }
            };

            const response_package_json = await fetch(`${this.origin}/package.json`);

            this.package_json = await response_package_json.json();

            await set_messages_json({ locale: 'en' });
            await set_messages_json({ locale: 'ru' });
            await set_messages_json({ locale: 'de' });
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1191');
        }

        return '';
    };

    public get_app_version = (): string => {
        try {
            if (globalThis.is_node) {
                // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
                const fs = require('fs-extra');

                const { version } = fs.readJSONSync(this.resolve('package.json'));

                return version;
            }

            if (n(this.package_json)) {
                return this.package_json.version;
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1191');
        }

        return '';
    };

    public msg = (msg: string): string => {
        try {
            const get_msgs = ({ user_language }: { user_language: string }): t.AnyRecord => {
                if (globalThis.is_node) {
                    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
                    const path = require('path');
                    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
                    const fs = require('fs-extra');

                    const messages_path: string = path.join(
                        '_locales',
                        user_language,
                        'messages.json',
                    );

                    return fs.readJSONSync(this.resolve(messages_path));
                }

                return this[`messages_${user_language}_json`];
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

    public read_env_into_global_var = async (): Promise<void> => {
        try {
            let env_file_text: string = '';

            if (globalThis.is_node) {
                // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
                const fs = require('fs-extra');

                env_file_text = fs.readFileSync(this.resolve('env.js'), {
                    encoding: 'utf8',
                });
            } else {
                const response = await fetch(`${this.origin}/env.js`);

                env_file_text = await response.text();
            }

            globalThis.env = JSON.parse(env_file_text.replace('globalThis.env = ', ''));
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1232');
        }
    };
}
