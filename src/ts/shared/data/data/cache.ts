import { runInAction } from 'mobx';

import { s_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_data = (): Promise<any> =>
        err_async(async () => {
            await s_data.Cache.set_data({ run_in_action: runInAction });
        }, 'shr_1246');

    public set_settings = ({ settings }: { settings: any }): Promise<any> =>
        err_async(async () => {
            await s_data.Cache.set_settings({ settings, run_in_action: runInAction });
        }, 'shr_1247');

    public set = ({ key, val }: { key: string; val: any }): Promise<void> =>
        err_async(async () => {
            s_data.Cache.set({ key, val, run_in_action: runInAction });
        }, 'shr_1251');
}

export const Cache = Class.get_instance();
