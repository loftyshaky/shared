import { makeObservable, observable, computed, action } from 'mobx';

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
            advanced_msg_is_visible_cls: computed,
            more_info_btn_is_visible_cls: computed,
            change_visibility_of_advanced_msg: action,
        });
    }

    private advanced_msg_is_visible: boolean = false;
    public basic_msg: string = '';
    public advanced_msg: string = '';

    public get advanced_msg_is_visible_cls(): string {
        return this.advanced_msg_is_visible ? '' : 'none';
    }

    public get more_info_btn_is_visible_cls(): string {
        return this.advanced_msg_is_visible ? 'none' : '';
    }

    public change_visibility_of_advanced_msg = ({ is_visible }: { is_visible: boolean }): void => {
        this.advanced_msg_is_visible = is_visible;
    };
}
