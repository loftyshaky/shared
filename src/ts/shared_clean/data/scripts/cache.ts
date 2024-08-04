import merge from 'lodash/merge';

import { t } from 'shared_clean/internal';

export class Cache {
    private static i0: Cache;

    public static i(): Cache {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public get_data = (): Promise<any> =>
        err_async(async () => {
            const session_data: any = await we.storage.session.get();

            const cache_is_filled: boolean = n(session_data.settings);
            const data: any = cache_is_filled ? session_data : await ext.storage_get();

            if (!cache_is_filled) {
                await this.set_data({ data });
            }

            return data;
        }, 'shr_1123');

    public set_data = ({
        data,
        replace = false,
        non_replaceable_keys,
    }: {
        data: any;
        replace?: boolean;
        non_replaceable_keys?: string[];
    }): Promise<void> =>
        err_async(async () => {
            // use this when updating settings with replace true
            let non_replaceable_keys_session_data: t.AnyRecord = {};

            if (replace) {
                non_replaceable_keys_session_data =
                    await we.storage.session.get(non_replaceable_keys);
                await we.storage.session.clear();
            }

            await we.storage.session.set(merge(non_replaceable_keys_session_data, data));
        }, 'shr_1124');
}
