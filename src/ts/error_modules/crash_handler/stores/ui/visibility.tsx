import { configure, action, observable } from 'mobx';

configure({ enforceActions: 'observed' });

export class Visibility {
    private static i0: Visibility;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    @observable public page_is_crashed: boolean = false; // true = shows reload ui screen

    @action public change_visibility_of_reload_ui_screen = (
        { is_visible }: { is_visible: boolean },
    ): void => {
        this.page_is_crashed = is_visible;
    }
}
