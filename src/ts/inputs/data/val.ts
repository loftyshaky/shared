import get from 'lodash/get';
import set from 'lodash/set';
import { SyntheticEvent, FormEvent } from 'react';
import { makeObservable, observable, action, runInAction } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t, i_data } from 'shared_clean/internal';
import { o_inputs, d_inputs, i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            warn_state: observable,
            set_focus_state: action,
            remove_val: action,
        });
    }

    public previous_val: t.AnyUndefined;

    public set_focus_state = ({ input, state }: { input: i_inputs.Input; state: boolean }): void =>
        err(() => {
            const new_input = input;
            new_input.is_in_focus_state = state;
        }, 'shr_1063');

    public set_warn_state = ({ input }: { input: i_inputs.Input }): Promise<void> =>
        err_async(async () => {
            let state: boolean | undefined = false;
            const new_input = input;

            if (n(input.warn_state_checker)) {
                state = await input.warn_state_checker({ input });
            }

            const returned_warn_state_val: boolean | undefined = n(state);

            runInAction(() =>
                err(() => {
                    if (returned_warn_state_val) {
                        new_input.is_in_warn_state =
                            new_input.warn_state_allowed_forced &&
                            input.warn_state_allowed &&
                            state;
                    }
                }, 'shr_1240'),
            );
        }, 'shr_1063');

    public focus_state = computedFn(function ({ input }: { input: i_inputs.Input }): string {
        return input.is_in_focus_state ? 'is_in_focus_state' : '';
    });

    public warn_state = computedFn(function ({ input }: { input: i_inputs.Input }): string {
        return input.is_in_warn_state ? 'is_in_warn_state' : '';
    });

    public access = ({ input }: { input: i_inputs.Input }): i_data.Val =>
        err(() => {
            const new_input = input;

            if (n(input.val_accessor)) {
                const val = get(data, input.val_accessor);
                const val_final: string = n(val) ? val : '';

                runInAction(() =>
                    err(() => {
                        if (val_final !== '') {
                            new_input.warn_state_allowed = true;
                        }
                    }, 'shr_1244'),
                );

                return val_final;
            }

            const val: string = n(data.settings.prefs[input.name])
                ? data.settings.prefs[input.name]
                : '';

            runInAction(() =>
                err(() => {
                    if (val !== '') {
                        new_input.warn_state_allowed = true;
                    }
                }, 'shr_1245'),
            );

            return val;
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
            this.previous_val = this.access({ input });

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

    public set = action(
        ({ val, input }: { val: i_data.Val | FileList; input: i_inputs.Input }): void =>
            err(() => {
                if (n(input.val_accessor)) {
                    set(data, input.val_accessor, val);
                } else {
                    data.settings.prefs[input.name] = val;
                }
            }, 'shr_1066'),
    );

    public remove_val = action(
        ({
            input,
            input_el,
        }: {
            input: i_inputs.Input;
            input_el: HTMLInputElement | null;
        }): Promise<void> =>
            err_async(async () => {
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
                    set(data, input.val_accessor, '');
                } else {
                    data.settings.prefs[input.name] = '';
                }

                if (n((input as o_inputs.Text).remove_val_callback)) {
                    await (input as o_inputs.Text).remove_val_callback!({ input });
                }

                await d_inputs.Val.set_warn_state({ input });
            }, 'shr_1067'),
    );

    public validate_input = ({ input }: { input: i_inputs.Input }): boolean =>
        err(() => {
            const val: i_data.Val = d_inputs.Val.access({ input });

            if (input.name === 'transition_duration' && typeof val === 'string') {
                return !/^(?!0)[1-9][0-9]*$/.test(val);
            }

            return false;
        }, 'shr_1068');

    public text_and_textarea_on_input = (
        { input }: { input: i_inputs.Input },
        e: FormEvent,
    ): Promise<void> =>
        err_async(async () => {
            await d_inputs.Val.change(
                {
                    input,
                },
                e,
            );

            await d_inputs.Val.set_warn_state({ input });
        }, 'shr_1254');
}

export const Val = Class.get_instance();
