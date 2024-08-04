import { runInAction } from 'mobx';

import { d_schema, o_schema } from 'shared_clean/internal';

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
    }: {
        data: any;
        transform_items: o_schema.TransformItem[];
        remove_from_storage?: boolean;
        keys_to_remove?: string[];
    }): Promise<any> =>
        err_async(
            async () =>
                d_schema.Main.i().transform({
                    data,
                    transform_items,
                    remove_from_storage,
                    keys_to_remove,
                    run_in_action: runInAction,
                }),
            'shr_1226',
        );
}
