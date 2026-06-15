import { d_error } from 'error_modules_clean/internal';
import type { i_error } from 'error_modules_clean/internal';
import type { t } from 'shared_clean/internal';

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
                console.log(msg);
            } else {
                alert(msg);
            }
        }
    }, 'shr_1193');

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    private log_error = (error_obj: Error, error_code: string): void => {
        d_error.Error.output(error_obj, error_code);
    };

    [index: string]: t.Any;

    private origin: string = globalThis.location ? globalThis.location.origin : '';
    public app_root = '';
    private messages_en_json: undefined | t.AnyRecord;
    private messages_ru_json: undefined | t.AnyRecord;
    private messages_de_json: undefined | t.AnyRecord;
    private already_set_messages: boolean = false;

    public get_app_version = (): string => {
        try {
            return env.version;
        } catch (error_obj: unknown) {
            if (n(error_obj)) {
                this.log_error(error_obj as i_error.ErrorObj, 'shr_1238');
            }
        }

        return '';
    };

    public get_app_name = (): string => {
        try {
            return env.name;
        } catch (error_obj: unknown) {
            this.log_error(error_obj as i_error.ErrorObj, 'shr_1309');
        }

        return '';
    };

    public get_language = (): string =>
        n(data) && n(data.settings.prefs) && data.settings.prefs.locale
            ? data.settings.prefs.locale
            : 'en';

    private content_dir = async (): Promise<string> => {
        try {
            if (globalThis.is_node) {
                const path = await import('path');

                return path.join(this.app_root, 'public', 'assets');
            }

            if (n(env) && env.env === 'adonis_app') {
                return `${this.origin}/assets`;
            }

            return '';
        } catch (error_obj: unknown) {
            this.log_error(error_obj as i_error.ErrorObj, 'shr_1237');
        }

        return '';
    };

    public read_data_into_vars = async (): Promise<string> => {
        try {
            if (!this.already_set_messages) {
                this.already_set_messages = true;

                const set_messages_json = async ({ locale }: { locale: string }): Promise<void> => {
                    try {
                        const content_dir: string = await this.content_dir();

                        if (globalThis.is_node) {
                            const path = await import('path');
                            const fs = await import('fs-extra');

                            const messages_path: string = path.join(
                                content_dir,
                                '_locales',
                                locale,
                                'messages.json',
                            );

                            if (fs.existsSync(messages_path)) {
                                this[`messages_${locale}_json`] = fs.readJSONSync(messages_path);
                            }
                        } else {
                            const path: string = `${content_dir}/_locales/${locale}/messages.json`;
                            const response_head = await fetch(path, { method: 'HEAD' });

                            if (response_head.ok) {
                                const response = await fetch(path);

                                this[`messages_${locale}_json`] = await response.json();
                            }
                        }
                    } catch (error_obj: unknown) {
                        this.log_error(error_obj as i_error.ErrorObj, 'shr_1233');
                    }
                };

                await set_messages_json({ locale: 'en' });
                await set_messages_json({ locale: 'ru' });
                await set_messages_json({ locale: 'de' });
            }
        } catch (error_obj: unknown) {
            this.log_error(error_obj as i_error.ErrorObj, 'shr_1191');
        }

        return '';
    };

    public msg = (msg: string): string => {
        try {
            const get_msgs = ({ user_language }: { user_language: string }): t.AnyRecord =>
                n(this[`messages_${user_language}_json`])
                    ? this[`messages_${user_language}_json`]
                    : {};

            const user_language = this.get_language();

            const is_english = user_language.includes('en');

            const en_msgs: t.AnyRecord = get_msgs({ user_language: 'en' });
            const localized_msgs: t.AnyRecord | undefined = is_english
                ? undefined
                : get_msgs({ user_language });

            let msg_2: string | undefined =
                n(en_msgs[msg]) && n(en_msgs[msg].message) ? en_msgs[msg].message : '';

            if (!is_english) {
                msg_2 =
                    n(localized_msgs) && n(localized_msgs[msg]) && n(localized_msgs[msg].message)
                        ? localized_msgs[msg].message
                        : msg_2;
            }

            return n(msg_2) ? msg_2 : '';
        } catch (error_obj: unknown) {
            this.log_error(error_obj as i_error.ErrorObj, 'shr_1192');
        }

        return '';
    };

    public read_env_into_global_var = async (): Promise<void> => {
        try {
            let env_file_text: string = '';

            if (globalThis.is_node) {
                const content_dir: string = await this.content_dir();
                const path = await import('path');
                const fs = await import('fs-extra');

                env_file_text = fs.readFileSync(path.join(content_dir, 'env.mjs'), {
                    encoding: 'utf8',
                });
            } else {
                const response = await fetch(`${this.origin}/env.mjs`);

                env_file_text = await response.text();
            }

            globalThis.env = JSON.parse(env_file_text.replace('globalThis.env = ', ''));
        } catch (error_obj: unknown) {
            this.log_error(error_obj as i_error.ErrorObj, 'shr_1232');
        }
    };

    public get_input_errors = (
        errors: t.AnyRecord,
        match_rules: {
            field: string;
            rule?: string;
            rules_exclude?: string[];
            input_error: string;
        }[],
    ): string[] => {
        // adonisjs
        try {
            const input_errors: string[] = [];

            if (!errors.success) {
                errors.messages.errors.forEach((error: t.AnyRecord) => {
                    match_rules.forEach((match_rule) => {
                        const exclusion_matched: boolean =
                            n(match_rule.rules_exclude) &&
                            match_rule.rules_exclude.some(
                                (rule_exclude) => rule_exclude === match_rule.rule,
                            );

                        const error_matched =
                            error.field === match_rule.field &&
                            (n(match_rule.rule) ? error.rule === match_rule.rule : true) &&
                            !exclusion_matched;

                        if (error_matched) {
                            input_errors.push(match_rule.input_error);
                        }
                    });
                });

                return input_errors;
            }
        } catch (error_obj: unknown) {
            this.log_error(error_obj as i_error.ErrorObj, 'shr_1242');
        }

        return [];
    };
}

export const App = Class.get_instance();
