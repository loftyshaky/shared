import { run_in_action_placeholder, o_schema } from 'shared_clean/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public transform = ({
        data,
        transform_items,
        remove_from_storage = true,
        keys_to_remove = [],
        run_in_action = run_in_action_placeholder,
    }: {
        data: any;
        transform_items: o_schema.TransformItem[];
        remove_from_storage?: boolean;
        keys_to_remove?: string[];
        run_in_action?: any;
    }): Promise<any> =>
        err_async(async () => {
            const properties_to_remove: string[] = [];

            transform_items.forEach((transform_item: o_schema.TransformItem): void =>
                err(() => {
                    if (
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
                                        data[transform_item.new_key] = data[transform_item.old_key];
                                    }
                                }, 'shr_1230'),
                            );
                        }
                    }

                    if (
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

            if (remove_from_storage) {
                await ext.storage_remove(properties_to_remove);
            }

            await ext.storage_remove(keys_to_remove);

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
        }, 'shr_1226');
}
