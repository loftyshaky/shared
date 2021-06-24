import { makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from 'shared/internal';

export class InputBase {
    public name: string;
    public is_visible_key?: string; // settings object key
    public is_visible?: boolean = true;
    public is_in_focus_state?: boolean = false;
    public is_in_warn_state?: boolean = false;
    public val_accessor?: string; // a.b.c
    public alt_msg?: string;
    public alt_help_msg?: string;
    public include_help?: boolean = false;
    public help_is_visible?: boolean = false;
    public parent?: string;
    public parent_disabled?: boolean = false;
    public offset?: number = 0;
    public style?: any;
    public section?: string;
    public subsection?: string;
    public event_callback: t.CallbackVariadicAny;
    public warn_state_checker?: t.CallbackVariadicAny;

    public constructor(obj: InputBase) {
        makeObservable(this, {
            is_visible: observable,
            is_in_focus_state: observable,
            is_in_warn_state: observable,
            help_is_visible: observable,
            offset: observable,
            parent_disabled: observable,
        });

        Object.assign(this, obj);
        this.name = obj.name;
        this.event_callback = obj.event_callback;
    }

    parent_disabled_cls? = computedFn(function (this: InputBase): string {
        return this.parent_disabled ? 'parent_disabled' : '';
    });
}
