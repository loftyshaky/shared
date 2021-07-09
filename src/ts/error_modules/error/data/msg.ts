import { makeObservable, observable, computed, action } from 'mobx';

import { d_error } from 'error_modules/internal';

export class Msg {
    private static i0: Msg;

    public static i(): Msg {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<Msg, 'advanced_msg_is_visible'>(this, {
            advanced_msg_is_visible: observable,
            basic_msg: observable,
            advanced_msg: observable,
            notification_msg_key: observable,
            main_msg: computed,
            advanced_msg_is_visible_cls: computed,
            more_info_btn_is_visible_cls: computed,
            change_visibility_of_advanced_msg: action,
        });
    }

    private advanced_msg_is_visible: boolean = false;
    public basic_msg: string = '';
    public advanced_msg: string = '';
    public notification_msg_key: string = '';

    public get advanced_msg_is_visible_cls(): string {
        return this.advanced_msg_is_visible ? '' : 'none';
    }

    public get more_info_btn_is_visible_cls(): string {
        return this.advanced_msg_is_visible ? 'none' : '';
    }

    public get main_msg(): string {
        return d_error.State.i().is_notification
            ? ext.msg(this.notification_msg_key)
            : this.basic_msg;
    }

    public change_visibility_of_advanced_msg = ({ is_visible }: { is_visible: boolean }): void => {
        this.advanced_msg_is_visible = is_visible;
    };
}
