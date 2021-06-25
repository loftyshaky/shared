import { makeObservable, observable, action, runInAction } from 'mobx';

import { s_css_vars } from 'shared/internal';

export class Visibility {
    private static i0: Visibility;

    public static i(): Visibility {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            outer_is_visible: observable,
            inner_is_none: observable,
            show: action,
        });
    }

    public outer_is_visible: boolean = false;
    public inner_is_none: boolean = false;

    public show = (): Promise<void> =>
        err_async(async () => {
            if (!this.inner_is_none) {
                this.outer_is_visible = true;
            }
        }, 'shr_1064');

    public hide = (): Promise<void> =>
        err_async(async () => {
            await x.delay(300);

            runInAction((): void =>
                err(() => {
                    this.outer_is_visible = false;
                }, 'shr_1156'),
            );

            await x.delay(+s_css_vars.Main.i().get({ name: 'transition_duration' }));

            runInAction((): void =>
                err(() => {
                    this.inner_is_none = true;
                }, 'shr_1157'),
            );
        }, 'shr_1065');
}
