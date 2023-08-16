import _ from 'lodash';
import { runInAction, toJS } from 'mobx';

import { t } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public set = ({
        settings,
        settings_are_corrupt = false,
    }: { settings?: any; settings_are_corrupt?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            let settings_final: any;

            if (n(settings)) {
                if (_.isEmpty(settings) || settings_are_corrupt) {
                    const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                    settings_final = default_settings;
                } else {
                    settings_final = settings;
                }
            }

            runInAction(() =>
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

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings = await ext.storage_get();
            const settings_are_corrupt: boolean = !n(settings.enable_cut_features);

            if (_.isEmpty(settings) || settings_are_corrupt) {
                const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                await ext.storage_set(default_settings, false);
                await this.set({ settings: default_settings, settings_are_corrupt });
            }

            if (!_.isEqual(toJS(data.settings), settings) && !settings_are_corrupt) {
                await this.set({ settings });
            }
        }, 'shr_1367');
}
