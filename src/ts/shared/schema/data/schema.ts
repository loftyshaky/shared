import { runInAction } from 'mobx';

import { d_schema, o_schema } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public transform = ({
        data,
        transform_items,
        keys_to_remove = [],
    }: {
        data: any;
        transform_items: o_schema.TransformItem[];
        keys_to_remove?: string[];
    }): Promise<any> =>
        err_async(
            async () =>
                d_schema.Schema.transform({
                    data,
                    transform_items,
                    keys_to_remove,
                    run_in_action: runInAction,
                }),
            'shr_1226',
        );
}
export const Schema = Class.get_instance();
