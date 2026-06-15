import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

import type { t } from 'shared_clean/internal';
import { run_in_action_placeholder, s_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public set = ({
        settings,
        run_in_action = run_in_action_placeholder,
    }: {
        settings?: t.AnyRecord;
        run_in_action?: t.CallbackVariadicVoid;
    }): Promise<void> =>
        err_async(async () => {
            let settings_final: t.AnyRecord | undefined;
            const prefs_are_filled: boolean = x.prefs_are_filled();

            if (prefs_are_filled && n(settings)) {
                settings_final = settings;
            } else {
                const default_settings = await ext.send_msg_resp({
                    msg: 'get_defaults',
                });
                const default_settings_final =
                    !n(default_settings) ||
                    typeof default_settings === 'string' ||
                    typeof default_settings === 'number'
                        ? undefined
                        : (default_settings as t.AnyRecord);

                settings_final = default_settings_final;
            }

            run_in_action(() =>
                err(() => {
                    if (n(settings_final) && 'prefs' in settings_final) {
                        data.settings.prefs.home_btn_is_visible =
                            settings_final.prefs.home_btn_is_visible;
                    }
                }, 'shr_1364'),
            );
        }, 'shr_1365');

    public set_from_storage = ({
        to_js,
        run_in_action = run_in_action_placeholder,
        set_data = s_data.Cache.set_data,
    }: {
        to_js?: t.CallbackVariadicAnyObjAsync;
        run_in_action?: t.CallbackVariadicVoid;
        set_data?: t.CallbackVoidAsync;
    } = {}): Promise<t.AnyRecord | undefined> =>
        err_async(async () => {
            if (!ext.ext_context_invalidated()) {
                const old_settings = cloneDeep(data.settings);
                await set_data();

                const prefs_are_filled: boolean = x.prefs_are_filled();

                if (prefs_are_filled) {
                    if (
                        !isEqual(
                            n(to_js) ? to_js(data.settings) : data.settings,
                            n(to_js) ? to_js(old_settings) : old_settings,
                        )
                    ) {
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
