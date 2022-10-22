import { makeObservable, action } from 'mobx';

import { o_schema } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            transform: action,
        });
    }

    public transform = ({
        settings,
        transform_items,
    }: {
        settings: any;
        transform_items: o_schema.TransformItem[];
    }): Promise<any> =>
        err_async(async () => {
            const properties_to_remove: string[] = [];

            transform_items.forEach((transform_item: o_schema.TransformItem): void =>
                err(() => {
                    if (
                        n(transform_item.new_key) &&
                        !n(settings[transform_item.new_key]) &&
                        (transform_item.create_property_if_it_doesnt_exist ||
                            (!transform_item.create_property_if_it_doesnt_exist &&
                                n(transform_item.old_key) &&
                                n(settings[transform_item.old_key])))
                    ) {
                        if (n(transform_item.new_val)) {
                            settings[transform_item.new_key] = transform_item.new_val;
                        } else if (n(transform_item.old_key)) {
                            settings[transform_item.new_key] = settings[transform_item.old_key];
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
                    delete settings[property_to_remove];
                }, 'shr_1228'),
            );

            await ext.storage_remove(properties_to_remove);

            return settings;
        }, 'shr_1226');
}
