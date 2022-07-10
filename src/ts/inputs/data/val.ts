import _ from 'lodash';
import { SyntheticEvent } from 'react';
import { makeObservable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { i_data } from 'shared/internal';
import { o_inputs, d_inputs, i_inputs } from 'inputs/internal';

export class Val {
    private static i0: Val;

    public static i(): Val {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<this, 'set_warn_state'>(this, {
            set_focus_state: action,
            set_warn_state: action,
            remove_val: action,
        });
    }

    public set_focus_state = ({ input, state }: { input: i_inputs.Input; state: boolean }): void =>
        err(() => {
            const new_input = input;
            new_input.is_in_focus_state = state;
        }, 'shr_1063');

    private set_warn_state = ({ input, state }: { input: i_inputs.Input; state: boolean }): void =>
        err(() => {
            const new_input = input;
            new_input.is_in_warn_state = state;
        }, 'shr_1063');

    public focus_state = computedFn(function ({ input }: { input: i_inputs.Input }): string {
        return input.is_in_focus_state ? 'is_in_focus_state' : '';
    });

    public warn_state = computedFn(function ({ input }: { input: i_inputs.Input }): string {
        if (n(input.warn_state_checker)) {
            const state = input.warn_state_checker({ input });

            Val.i().set_warn_state({ input, state });

            return state ? 'is_in_warn_state' : '';
        }

        return '';
    });

    public access = ({ input }: { input: i_inputs.Input }): i_data.Val =>
        err(() => {
            if (n(input.val_accessor)) {
                return _.get(data, input.val_accessor);
            }

            return n(data.settings[input.name]) ? data.settings[input.name] : '';
        }, 'shr_1064');

    public change = (
        {
            input,
        }: {
            input: i_inputs.Input;
        },
        e: SyntheticEvent,
    ): void =>
        err(() => {
            if (input.type === 'checkbox') {
                this.set({
                    val: (e.target as HTMLInputElement).checked,
                    input,
                });
            } else {
                this.set({
                    val: (e.target as HTMLInputElement).value,
                    input,
                });
            }

            input.event_callback({ input });
        }, 'shr_1065');

    public set = action(({ val, input }: { val: i_data.Val; input: i_inputs.Input }): void =>
        err(() => {
            if (n(input.val_accessor)) {
                _.set(data, input.val_accessor, val);
            } else {
                data.settings[input.name] = val;
            }
        }, 'shr_1066'),
    );

    public remove_val = action(
        ({ input, input_el }: { input: i_inputs.Input; input_el: HTMLInputElement | null }): void =>
            err(() => {
                if (n(input_el)) {
                    input_el.focus();
                }

                if (n(input.val_accessor)) {
                    this.set({
                        val: '',
                        input,
                    });
                }

                if (n(input.val_accessor)) {
                    _.set(data, input.val_accessor, '');
                } else {
                    data.settings[input.name] = '';
                }

                if (n((input as o_inputs.Text).remove_val_callback)) {
                    (input as o_inputs.Text).remove_val_callback!({ input });
                }
            }, 'shr_1067'),
    );

    public validate_input = ({ input }: { input: i_inputs.Input }): boolean =>
        err(() => {
            const val: i_data.Val = d_inputs.Val.i().access({ input });

            if (input.name === 'transition_duration' && typeof val === 'string') {
                return !/^(?!0)[1-9][0-9]*$/.test(val);
            }

            return false;
        }, 'shr_1068');
}
