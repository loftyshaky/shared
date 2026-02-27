import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { makeObservable, observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from 'shared_clean/internal';
import { i_inputs } from 'inputs/internal';

export class InputBase {
    public name: string;
    public id?: string = x.unique_id();
    public is_cut?: boolean = false;
    public is_visible_key?: string; // prefs object key
    public is_visible?: boolean = true;
    public is_visible_conds?: i_inputs.StateCond[] = [];
    public is_enabled?: boolean = true;
    public is_enabled_conds?: i_inputs.StateCond[] = [];
    public parent_disabled?: boolean = false;
    public is_in_focus_state?: boolean = false;
    public is_in_warn_state?: boolean = false;
    public input_errors?: string[] = [];
    public warn_state_allowed?: boolean = false;
    public warn_state_allowed_forced?: boolean = true;
    public val_accessor?: string; // a.b.c
    public default_val?: string | number | boolean;
    public is_column_layout?: boolean = false; // for group inputs
    public alt_msg?: string;
    public alt_help_msg?: string;
    public include_help?: boolean = false;
    public help_is_visible?: boolean = false;
    public side_btns?: i_inputs.SideBtn[] = [];
    public parent?: string;
    public offset?: string = '0';
    public form?: string;
    public section?: string;
    public subsection?: string;
    public developer_mode_setting?: boolean = false;
    public event_callback: t.CallbackVariadicVoid;
    public warn_state_checker?: ({
        input,
    }: {
        input: i_inputs.Input;
    }) => boolean | Promise<boolean | undefined>;

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
            input_errors: observable,
            warn_state_allowed: observable,
            warn_state_allowed_forced: observable,
            help_is_visible: observable,
            offset: observable,
            set_input_errors: action,
        });

        Object.assign(this, obj);
        this.name = obj.name;
        this.event_callback = obj.event_callback;
    }

    is_cut_computed? = computedFn(function (this: InputBase): boolean {
        return (this.is_cut && data.settings.prefs.enable_cut_features) || !this.is_cut;
    });

    is_visible_computed? = computedFn(function (this: InputBase): boolean {
        return (
            this.check_state!({ state_type: 'is_visible' }) &&
            this.is_cut_computed!() &&
            (!this.developer_mode_setting ||
                (this.developer_mode_setting && data.settings.prefs.developer_mode))
        );
    });

    is_enabled_computed? = computedFn(function (this: InputBase): boolean {
        return this.check_state!({ state_type: 'is_enabled' });
    });

    public is_enabled_final? = (): boolean =>
        err(
            () =>
                !this.is_visible_computed!() ||
                (!this.parent_disabled_computed!() && this.is_enabled_computed!()),
            'shr_1224',
        );

    is_enabled_cls? = computedFn(function (this: InputBase): string {
        return this.is_enabled_final!() ? '' : 'is_disabled';
    });

    tab_index? = computedFn(function (this: InputBase): number {
        return this.is_enabled_final!() ? 0 : -1;
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
            const conds_provided: boolean = !isEmpty(state_conds);

            if (n(state_conds) && conds_provided) {
                return !state_conds.every((cond: i_inputs.StateCond): boolean =>
                    err(
                        () =>
                            cond.pass_vals.some((pass_val: boolean | string | number): boolean =>
                                err(() => {
                                    if (n(cond.val_accessor)) {
                                        const val = get(data, cond.val_accessor);
                                        const val_final: string = n(val) ? val : '';

                                        return val_final === pass_val;
                                    }

                                    return data.settings.prefs[cond.input_name] === pass_val;
                                }, 'shr_1207'),
                            ),
                        'shr_1206',
                    ),
                );
            }

            return false;
        }, 'shr_1219');

    public set_input_errors? = ({ input_errors }: { input_errors: string[] }): void =>
        err(() => {
            this.input_errors = input_errors;
        }, 'shr_1241');

    public is_column_layout_cond? = () =>
        err(() => (this.is_column_layout ? 'is_column_layout' : ''), 'shr_1306');
}
