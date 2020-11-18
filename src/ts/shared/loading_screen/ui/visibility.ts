import {
    configure,
    observable,
    action,
    runInAction,
} from 'mobx';

import { CssVars } from 'shared/internal';

configure({ enforceActions: 'observed' });

export class Visibility {
    private static i0: Visibility;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    @observable public outer_is_visible: boolean = false;
    @observable public inner_is_none: boolean = false;

    @action public show = (): Promise<void> => err_async(async () => {
        if (!this.inner_is_none) {
            this.outer_is_visible = true;
        }
    },
    's1015');

    public hide = (): Promise<void> => err_async(async () => {
        await x.delay(300);

        runInAction((): void => {
            this.outer_is_visible = false;
        });

        await x.delay(+CssVars.i.get({ name: 'transition_duration' }));

        runInAction((): void => {
            this.inner_is_none = true;
        });
    },
    's1016');
}
