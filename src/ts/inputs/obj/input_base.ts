import _ from 'lodash';
import { makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from 'shared/internal';
import { i_inputs } from 'inputs/internal';

export class InputBase {
    public name: string;
    public is_cut?: boolean = false;
    public is_visible_key?: string; // settings object key
    public is_visible?: boolean = true;
    public visiblity_conds?: i_inputs.VisiblityCond[] = [];
    public is_in_focus_state?: boolean = false;
    public is_in_warn_state?: boolean = false;
    public val_accessor?: string; // a.b.c
    public alt_msg?: string;
    public alt_help_msg?: string;
    public include_help?: boolean = false;
    public help_is_visible?: boolean = false;
    public parent?: string;
    public parent_disabled?: boolean = false;
    public offset?: string = '0';
    public section?: string;
    public subsection?: string;
    public event_callback: t.CallbackVariadicVoid;
    public warn_state_checker?: ({ input }: { input: i_inputs.Input }) => boolean;

    public constructor(obj: InputBase) {
        makeObservable(this, {
            is_cut: observable,
            is_visible: observable,
            is_visible_visiblity_conds: observable,
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
        return this.parent_disabled && this.is_visible_visiblity_conds!() ? 'parent_disabled' : '';
    });

    is_visible_visiblity_conds? = computedFn(function (this: InputBase): boolean {
        const visibility_conds_provided: boolean = !_.isEmpty(this.visiblity_conds);

        if (n(this.visiblity_conds) && visibility_conds_provided) {
            return this.visiblity_conds.every((visiblity_cond: i_inputs.VisiblityCond): boolean =>
                err(
                    () =>
                        visiblity_cond.pass_values.some(
                            (pass_value: boolean | string | number): boolean =>
                                err(
                                    () => data.settings[visiblity_cond.input_name] === pass_value,
                                    'shr_1207',
                                ),
                        ),
                    'shr_1206',
                ),
            );
        }

        return true;
    });
}
