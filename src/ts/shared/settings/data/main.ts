import { runInAction, toJS } from 'mobx';

import { d_settings } from 'shared_clean/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set = ({
        settings,
        settings_are_corrupt = false,
    }: {
        settings?: any;
        settings_are_corrupt?: boolean;
    }): Promise<void> =>
        err_async(
            async () =>
                d_settings.Main.i().set({
                    settings,
                    settings_are_corrupt,
                    run_in_action: runInAction,
                }),
            'shr_1365',
        );

    public set_from_storage = (): Promise<any> =>
        err_async(
            async () =>
                d_settings.Main.i().set_from_storage({ to_js: toJS, run_in_action: runInAction }),
            'shr_1235',
        );
}
