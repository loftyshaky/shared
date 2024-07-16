import _ from 'lodash';

export class Cache {
    private static i0: Cache;

    public static i(): Cache {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private cached_data: any = {};
    public cache_is_empty: boolean = false;

    public get_data = (): Promise<any> =>
        err_async(async () => {
            const data_is_in_cache_var: boolean = n(this.cached_data.settings);
            const session_data: any = data_is_in_cache_var
                ? { ...this.cached_data }
                : await we.storage.session.get();
            const data_is_in_cache: boolean = n(session_data) && n(session_data.settings);
            const data: any = data_is_in_cache ? session_data : await ext.storage_get();

            if (!data_is_in_cache_var) {
                await this.set_data({ data, replace: true });
            }

            this.cache_is_empty = this.cache_is_empty ? this.cache_is_empty : !data_is_in_cache;

            return data;
        }, 'cot_1123');

    public set_data = ({ data, replace }: { data: any; replace: boolean }): Promise<void> =>
        err_async(async () => {
            const session_data: any = await we.storage.session.get();
            const merged_data: any = n(replace) ? data : _.merge(session_data, data);

            await we.storage.session.set(merged_data);

            this.cached_data = merged_data;
        }, 'cot_1124');
}
