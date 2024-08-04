import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { t, run_in_action_placeholder, s_data } from 'shared_clean/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set = ({
        settings,
        settings_are_corrupt = false,
        run_in_action = run_in_action_placeholder,
    }: {
        settings?: any;
        settings_are_corrupt?: boolean;
        run_in_action?: any;
    }): Promise<void> =>
        err_async(async () => {
            let settings_final: any;

            if (n(settings)) {
                if (isEmpty(settings) || settings_are_corrupt) {
                    const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                    settings_final = default_settings;
                } else {
                    settings_final = settings;
                }
            }

            const new_settings = n(settings_final.settings)
                ? settings_final.settings
                : settings_final;

            run_in_action(() =>
                err(() => {
                    data.settings = new_settings;
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
    }: {
        to_js?: any;
        run_in_action?: any;
    } = {}): Promise<any> =>
        err_async(async () => {
            if (!ext.ext_context_invalidated()) {
                const settings = await s_data.Cache.i().get_data();
                const settings_are_corrupt: boolean = n(settings.settings)
                    ? !n(settings.settings.enable_cut_features)
                    : !n(settings.enable_cut_features);

                if (isEmpty(settings) || settings_are_corrupt) {
                    const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                    await ext.storage_set(default_settings, false);
                    await this.set({
                        settings: default_settings,
                        settings_are_corrupt,
                        run_in_action,
                    });
                }

                if (
                    !isEqual(n(to_js) ? to_js(data.settings) : data.settings, settings) &&
                    !settings_are_corrupt
                ) {
                    await this.set({ settings, run_in_action });
                }

                return settings;
            }

            return undefined;
        }, 'shr_1367');
}
