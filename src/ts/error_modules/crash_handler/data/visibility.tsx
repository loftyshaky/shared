import { makeObservable, observable, action } from 'mobx';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            page_is_crashed: observable,
            show_reload_ui_screen: action,
        });
    }

    public page_is_crashed: boolean = false; // true = shows reload ui screen

    public show_reload_ui_screen = (): void => {
        this.page_is_crashed = true;
    };
}

export const Visibility = Class.get_instance();
