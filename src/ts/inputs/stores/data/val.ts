import _ from 'lodash';
import {
    action,
    makeObservable,
} from 'mobx';
import { computedFn } from 'mobx-utils';

import { i_inputs } from 'inputs/internal';

export class Val {
    private static i0: Val;

    constructor() {
        makeObservable(
            this,
            { remove_val: action },
        );
    }

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
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

        return data[input.name] || '';
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

        data[input.name] = val;
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

        data[input.name] = '';
    },
    's1017'));
}
