import { run_in_action_placeholder, s_data } from 'shared_clean/internal';
import type { t } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public get_data = ({
        set_from_storage = false,
    }: {
        set_from_storage?: boolean;
    } = {}): Promise<t.AnyRecord | undefined> =>
        err_async(async () => {
            const session_data: t.AnyRecord =
                env.browser !== 'firefox' || page !== 'content_script'
                    ? await we.storage.session.get()
                    : {};

            const cache_is_filled: boolean = n(session_data.settings);
            let data_obj: t.AnyRecord | undefined =
                cache_is_filled && !set_from_storage ? session_data : await ext.storage_get();

            if (set_from_storage) {
                if (n(data_obj)) {
                    data_obj = s_data.Settings.apply_unchanged_prefs({
                        settings: data_obj,
                    });
                }
            }

            if (!cache_is_filled || set_from_storage) {
                // doesn't run if cache is empty
                await this.set_settings({ settings: data_obj });

                return { settings: data_obj };
            }

            return data_obj; // Always session data like: { settings: {} }
        }, 'shr_1123');

    public set_data = ({
        run_in_action = run_in_action_placeholder,
    }: {
        run_in_action?: t.CallbackVariadicVoid;
    } = {}): Promise<void> =>
        err_async(async () => {
            // get data from storage. sync/local/session and set it to data. property. Run this function on page init().
            const session = await this.get_data();

            run_in_action(() =>
                err(() => {
                    Object.assign(data, session);
                }, 'shr_1244'),
            );
        }, 'shr_1243');

    public set_settings = ({
        settings = {},
        run_in_action = run_in_action_placeholder,
    }: {
        settings?: t.AnyRecord;
        run_in_action?: t.CallbackVariadicVoid;
    } = {}): Promise<void> =>
        err_async(async () => {
            if (env.browser !== 'firefox' || page !== 'content_script') {
                await we.storage.session.set({ settings });
            }

            run_in_action(() =>
                err(() => {
                    data.settings = settings;
                }, 'shr_1245'),
            );
        }, 'shr_1124');

    public set = ({
        key,
        val,
        run_in_action = run_in_action_placeholder,
    }: {
        key: string;
        val: t.Any;
        run_in_action?: t.CallbackVariadicVoid;
    }): Promise<void> =>
        err_async(async () => {
            if (env.browser !== 'firefox' || page !== 'content_script') {
                await we.storage.session.set({ [key]: val });
            }

            run_in_action(() =>
                err(() => {
                    data[key] = val;
                }, 'shr_1248'),
            );
        }, 'shr_1249');

    public get = ({ key }: { key: string }): Promise<t.CallbackAnyObjAsync> =>
        err_async(
            async () => (n(data[key]) ? data[key] : (await we.storage.session.get(key))[key]),
            'shr_1250',
        );
}

export const Cache = Class.get_instance();
