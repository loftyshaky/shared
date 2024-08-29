import { runInAction, toJS } from 'mobx';

import { d_data as d_data_shared_clean } from 'shared_clean/internal';
import { d_data } from 'shared/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set = ({ settings }: { settings?: any }): Promise<void> =>
        err_async(
            async () =>
                d_data_shared_clean.Settings.set({
                    settings,
                    run_in_action: runInAction,
                }),
            'shr_1365',
        );

    public set_from_storage = (): Promise<any> =>
        err_async(
            async () =>
                d_data_shared_clean.Settings.set_from_storage({
                    to_js: toJS,
                    run_in_action: runInAction,
                    set_data: d_data.Cache.set_data,
                }),
            'shr_1235',
        );
}

export const Settings = Class.get_instance();
