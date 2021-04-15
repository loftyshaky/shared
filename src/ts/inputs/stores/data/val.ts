import _ from 'lodash';
import {
    makeObservable,
    action,
} from 'mobx';
import { computedFn } from 'mobx-utils';

import {
    o_inputs,
    i_inputs,
} from 'inputs/internal';

export class Val {
    private static i0: Val;

    public static i(): Val {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                set_focus_state: action,
                remove_val: action,
            },
        );
    }

    public set_focus_state = (
        {
            input,
            state,
        }: {
            input: i_inputs.Input;
            state: boolean
        },
    ): void => err(() => {
        const new_input = input;
        new_input.is_in_focus_state = state;
    },
    's1022');

    public focus_state = computedFn(
        function ({ input }: { input: i_inputs.Input; }): string {
            return input.is_in_focus_state
                ? 'is_in_focus_state'
                : '';
        },
    );

    public warn_state = computedFn(
        function ({ input }: { input: i_inputs.Input; }): string {
            if (n(input.warn_state_checker)) {
                return input.warn_state_checker({ input })
                    ? 'is_in_warn_state'
                    : '';
            }

            return '';
        },
    );

    public access = ({ input }: { input: i_inputs.Input }): any => err(() => {
        if (n(input.val_accessor)) {
            return _.get(
                data,
                input.val_accessor,
            );
        }

        return n(data.settings[input.name])
            ? data.settings[input.name]
            : '';
    },
    's1023');

    public change = (
        {
            input,
        }: {
            input: i_inputs.Input;
        },
        e: any,
    ): void => err(() => {
        if (input.type === 'checkbox') {
            this.set({
                val: e.target.checked,
                input,
            });
        } else {
            this.set({
                val: e.target.value,
                input,
            });
        }

        input.event_callback({ input });
    },
    's1008');

    private set = action(({
        val,
        input,
    }: {
        val: string | boolean
        input: i_inputs.Input;
    }): void => err(() => {
        if (n(input.val_accessor)) {
            _.set(
                data,
                input.val_accessor,
                val,
            );
        }

        data.settings[input.name] = val;
    },
    's1024'));

    public remove_val = action((
        {
            input,
        }: {
            input: i_inputs.Input;
        },
    ): void => err(() => {
        if (n(input.val_accessor)) {
            this.set({
                val: '',
                input,
            });
        }

        data.settings[input.name] = '';

        if (n((input as o_inputs.Text).remove_val_callback)) {
            (input as o_inputs.Text).remove_val_callback!({ input });
        }
    },
    's1017'));
}
