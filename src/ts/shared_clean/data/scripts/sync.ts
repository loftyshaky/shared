import { t, s_data } from 'shared_clean/internal';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

export class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public react_sync = ({
        changes,
        callback,
    }: {
        changes: any;
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

                await callback();
            }
        }, 'shr_1240');
}

export const Sync = Class.get_instance();
