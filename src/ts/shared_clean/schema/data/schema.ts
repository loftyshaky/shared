import { run_in_action_placeholder, s_data, o_schema } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public transform = ({
        data,
        transform_items,
        keys_to_remove = [],
        force = false,
        run_in_action = run_in_action_placeholder,
    }: {
        data: any;
        transform_items: o_schema.TransformItem[];
        keys_to_remove?: string[];
        force?: boolean;
        run_in_action?: any;
    }): Promise<any> =>
        err_async(async () => {
            const settings = await s_data.Cache.get_data();
            const stored_version: number = n(settings.settings)
                ? settings.settings.version
                : settings.version;

            if (stored_version !== ext.get_app_version() || force) {
                const properties_to_remove: string[] = [];

                transform_items.forEach((transform_item: o_schema.TransformItem): void =>
                    err(() => {
                        if (
                            !transform_item.update_existing_val &&
                            n(transform_item.new_key) &&
                            !n(data[transform_item.new_key]) &&
                            (transform_item.create_property_if_it_doesnt_exist ||
                                (!transform_item.create_property_if_it_doesnt_exist &&
                                    n(transform_item.old_key) &&
                                    n(data[transform_item.old_key])))
                        ) {
                            if (n(transform_item.new_val)) {
                                run_in_action(() =>
                                    err(() => {
                                        if (n(transform_item) && n(transform_item.new_key)) {
                                            data[transform_item.new_key] = transform_item.new_val;
                                        }
                                    }, 'shr_1229'),
                                );
                            } else if (n(transform_item.old_key)) {
                                run_in_action(() =>
                                    err(() => {
                                        if (
                                            n(transform_item) &&
                                            n(transform_item.new_key) &&
                                            n(transform_item.old_key)
                                        ) {
                                            data[transform_item.new_key] =
                                                data[transform_item.old_key];
                                        }
                                    }, 'shr_1230'),
                                );
                            }
                        }

                        if (
                            transform_item.update_existing_val &&
                            n(transform_item.old_key) &&
                            n(transform_item.new_val)
                        ) {
                            data[transform_item.old_key] = transform_item.new_val;
                        }

                        if (
                            !transform_item.update_existing_val &&
                            n(transform_item.old_key) &&
                            !properties_to_remove.includes(transform_item.old_key)
                        ) {
                            properties_to_remove.push(transform_item.old_key);
                        }
                    }, 'shr_1227'),
                );

                properties_to_remove.forEach((property_to_remove: string): void =>
                    err(() => {
                        run_in_action(() =>
                            err(() => {
                                delete data[property_to_remove];
                            }, 'shr_1231'),
                        );
                    }, 'shr_1228'),
                );

                keys_to_remove.forEach((key_to_remove: string): void =>
                    err(() => {
                        run_in_action(() =>
                            err(() => {
                                delete data[key_to_remove];
                            }, 'shr_1231'),
                        );
                    }, 'shr_1260'),
                );

                return data;
            }

            return data;
        }, 'shr_1226');

    public replace = ({ data }: { data: any }): Promise<void> =>
        err_async(async () => {
            await ext.storage_set(data, true);
        }, 'shr_1236');
}

export const Schema = Class.get_instance();
