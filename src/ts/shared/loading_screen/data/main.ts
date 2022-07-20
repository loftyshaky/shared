import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { s_css_vars } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<Main, 'inner_is_none'>(this, {
            outer_is_visible: observable,
            inner_is_none: observable,
            inner_visibility_cls: computed,
            show: action,
        });
    }

    public outer_is_visible: boolean = false;
    private inner_is_none: boolean = false;

    public get inner_visibility_cls(): string {
        return this.inner_is_none ? 'none' : '';
    }

    public show = (): Promise<void> =>
        err_async(async () => {
            if (!this.inner_is_none) {
                this.outer_is_visible = true;
            }
        }, 'shr_1116');

    public hide = ({ app_id }: { app_id: string }): Promise<void> =>
        err_async(async () => {
            await x.delay(300);

            runInAction(() =>
                err(() => {
                    this.outer_is_visible = false;
                }, 'shr_1117'),
            );

            this.show_roots({ app_id });

            await x.delay(+s_css_vars.Main.i().get({ name: 'transition_duration' }));

            runInAction(() =>
                err(() => {
                    this.inner_is_none = true;
                }, 'shr_1118'),
            );
        }, 'shr_1119');

    public hide_roots = ({ app_id }: { app_id: string }): void =>
        err(() => {
            x.css('hidden_roots', document.head, `hidden_roots_link_${app_id}`);
        }, 'shr_1235');

    private show_roots = ({ app_id }: { app_id: string }): void =>
        err(() => {
            x.remove(s<HTMLLinkElement>(`.hidden_roots_link_${app_id}`));
        }, 'shr_1235');
}
