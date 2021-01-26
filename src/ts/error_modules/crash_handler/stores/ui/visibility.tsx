import {
    makeObservable,
    action,
    observable,
} from 'mobx';

export class Visibility {
    private static i0: Visibility;

    constructor() {
        makeObservable(
            this,
            {
                page_is_crashed: observable,
                show_reload_ui_screen: action,
            },
        );
    }

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public page_is_crashed: boolean = false; // true = shows reload ui screen

    public show_reload_ui_screen = (): void => {
        this.page_is_crashed = true;
    };
}
