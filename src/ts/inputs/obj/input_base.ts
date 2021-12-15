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
    public is_visible_conds?: i_inputs.StateCond[] = [];
    public is_enabled?: boolean = true;
    public is_enabled_conds?: i_inputs.StateCond[] = [];
    public parent_disabled?: boolean = false;
    public is_in_focus_state?: boolean = false;
    public is_in_warn_state?: boolean = false;
    public val_accessor?: string; // a.b.c
    public alt_msg?: string;
    public alt_help_msg?: string;
    public include_help?: boolean = false;
    public help_is_visible?: boolean = false;
    public parent?: string;
    public offset?: string = '0';
    public section?: string;
    public subsection?: string;
    public event_callback: t.CallbackVariadicVoid;
    public warn_state_checker?: ({ input }: { input: i_inputs.Input }) => boolean;

    public constructor(obj: InputBase) {
        makeObservable(this, {
            is_cut: observable,
            is_visible: observable,
            is_visible_conds: observable,
            is_enabled: observable,
            is_enabled_conds: observable,
            parent_disabled: observable,
            is_in_focus_state: observable,
            is_in_warn_state: observable,
            help_is_visible: observable,
            offset: observable,
        });

        Object.assign(this, obj);
        this.name = obj.name;
        this.event_callback = obj.event_callback;
    }

    is_visible_computed? = computedFn(function (this: InputBase): boolean {
        return this.check_state!({ state_type: 'is_visible' });
    });

    is_enabled_computed? = computedFn(function (this: InputBase): boolean {
        return this.check_state!({ state_type: 'is_enabled' });
    });

    is_enabled_cls? = computedFn(function (this: InputBase): string {
        return !this.is_visible_computed!() ||
            (!this.parent_disabled_computed!() && this.is_enabled_computed!())
            ? ''
            : 'is_disabled';
    });

    tab_index? = computedFn(function (this: InputBase): number {
        return this.is_enabled_computed!() ? 0 : -1;
    });

    parent_disabled_computed? = computedFn(function (this: InputBase): boolean {
        if (this.parent_disabled) {
            return this.parent_disabled;
        }

        return false;
    });

    private check_state? = ({ state_type }: { state_type: 'is_visible' | 'is_enabled' }): boolean =>
        err(() => {
            const conds_state: boolean = this.check_state_conds!({
                state_conds: (this as any)[`${state_type}_conds`],
            });

            if (conds_state) {
                return false;
            }

            if (!this[state_type]) {
                return false;
            }

            return true;
        }, 'shr_1220');

    private check_state_conds? = ({
        state_conds,
    }: {
        state_conds: i_inputs.StateCond[] | undefined;
    }): boolean =>
        err(() => {
            const conds_provided: boolean = !_.isEmpty(state_conds);

            if (n(state_conds) && conds_provided) {
                return !state_conds.every((cond: i_inputs.StateCond): boolean =>
                    err(
                        () =>
                            cond.pass_values.some(
                                (pass_value: boolean | string | number): boolean =>
                                    err(
                                        () => data.settings[cond.input_name] === pass_value,
                                        'shr_1207',
                                    ),
                            ),
                        'shr_1206',
                    ),
                );
            }

            return false;
        }, 'shr_1219');
}
