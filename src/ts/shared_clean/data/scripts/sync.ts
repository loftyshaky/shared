import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import type { t } from 'shared_clean/internal';
import { s_data } from 'shared_clean/internal';

export class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public react_sync = ({
        changes,
        callback,
    }: {
        changes: t.AnyRecord;
        callback: t.CallbackVoid;
    }): Promise<void> =>
        err_async(async () => {
            const found_new_changes: boolean =
                !isEmpty(data.settings) &&
                Object.keys(changes).some(
                    (key: string) =>
                        !isEqual(data.settings[key], changes[key].newValue) &&
                        n(changes[key].newValue),
                );

            if (found_new_changes) {
                await s_data.Cache.get_data({ set_from_storage: true });

                callback();
            }
        }, 'shr_1240');
}

export const Sync = Class.get_instance();
