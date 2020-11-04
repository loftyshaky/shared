import {
    configure,
    action,
    observable,
    computed,
} from 'mobx';

configure({ enforceActions: 'observed' });

export class Msg {
    private static i0: Msg;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    @observable private advanced_msg_is_visible: boolean = false;
    @observable public basic_msg: string = '';
    @observable public advanced_msg: string = '';

    @computed public get advanced_msg_is_visible_cls(): string {
        return this.advanced_msg_is_visible
            ? ''
            : 'none';
    }

    @computed public get more_info_btn_is_visible_cls(): string {
        return this.advanced_msg_is_visible
            ? 'none'
            : '';
    }

    @action public change_visibility_of_advanced_msg = (
        {
            is_visible,
        }: {
            is_visible: boolean
        },
    ): void => {
        this.advanced_msg_is_visible = is_visible;
    }
}
