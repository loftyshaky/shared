import {
    configure,
    observable,
} from 'mobx';

import { t } from 'shared/internal';

configure({ enforceActions: 'observed' });

export class InputBase {
    public name: string;
    public is_visible_key?: string; // settings object key
    @observable public is_visible?: boolean = true;
    @observable public is_in_warn_state?: boolean = false;
    @observable public val?: string = '';
    public alt_msg?: string;
    public include_help?: boolean = false;
    @observable public help_is_visible?: boolean = false;
    public parent?: string;
    public style?: any;
    public section?: string;
    public subsection?: string;
    public event_callback: t.CallbackVariadicAny;

    public constructor(obj: InputBase) {
        Object.assign(
            this,
            obj,
        );
        this.name = obj.name;
        this.event_callback = obj.event_callback;
    }
}
