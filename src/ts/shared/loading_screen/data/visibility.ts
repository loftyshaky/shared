import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { s_css_vars } from 'shared_clean/internal';
import { s_loading_screen } from 'shared/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable<Class, 'inner_is_none'>(this, {
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
                s_loading_screen.Tr.enable_no_tr();

                this.outer_is_visible = true;
            }
        }, 'shr_1116');

    public hide = ({ app_id }: { app_id: string }): Promise<void> =>
        err_async(async () => {
            s_loading_screen.Tr.disable_no_tr();

            await x.delay(300);

            runInAction(() =>
                err(() => {
                    this.outer_is_visible = false;
                }, 'shr_1117'),
            );

            s_loading_screen.Roots.show_roots({ app_id });

            await x.delay(+s_css_vars.CssVars.get({ name: 'transition_duration' }));

            runInAction(() =>
                err(() => {
                    this.inner_is_none = true;
                }, 'shr_1118'),
            );
        }, 'shr_1119');
}
export const Visibility = Class.get_instance();
