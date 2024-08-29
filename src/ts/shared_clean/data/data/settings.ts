import isEqual from 'lodash/isEqual';

import { t, run_in_action_placeholder, s_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set = ({
        settings,
        run_in_action = run_in_action_placeholder,
    }: {
        settings?: any;
        run_in_action?: any;
    }): Promise<void> =>
        err_async(async () => {
            let settings_final: any;
            const prefs_are_filled: boolean = x.prefs_are_filled();

            if (prefs_are_filled && n(settings)) {
                settings_final = settings;
            } else {
                const default_settings = await ext.send_msg_resp({
                    msg: 'get_defaults',
                });

                settings_final = default_settings;
            }

            run_in_action(() =>
                err(() => {
                    data.settings = settings_final;
                }, 'shr_1364'),
            );
        }, 'shr_1365');

    public change = ({ key, val }: { key: string; val: t.AnyUndefined }): Promise<void> =>
        err_async(async () => {
            data.settings[key] = val;

            await ext.send_msg_resp({
                msg: 'update_settings_background',
                settings: { [key]: val },
            });
        }, 'shr_1366');

    public set_from_storage = ({
        to_js,
        run_in_action = run_in_action_placeholder,
        set_data = s_data.Cache.set_data,
    }: {
        to_js?: any;
        run_in_action?: any;
        set_data?: any;
    } = {}): Promise<any> =>
        err_async(async () => {
            if (!ext.ext_context_invalidated()) {
                await set_data();

                const prefs_are_filled: boolean = x.prefs_are_filled();

                if (prefs_are_filled) {
                    if (!isEqual(n(to_js) ? to_js(data.settings) : data.settings, data.settings)) {
                        await this.set({ settings: data.settings, run_in_action });
                    }
                } else {
                    await this.set({
                        run_in_action,
                    });
                }

                return data.settings;
            }

            return undefined;
        }, 'shr_1367');
}

export const Settings = Class.get_instance();
