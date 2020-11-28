import { configure, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { i_inputs } from 'inputs/internal';

configure({ enforceActions: 'observed' });

export class Val {
    private static i0: Val;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

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

    @action public change = (
        {
            input,
        }: {
            input: i_inputs.Input;
        },
        e: any,
    ): void => err(() => {
        const new_input = input;

        if (new_input.type === 'checkbox') {
            new_input.val = e.target.checked;
        } else {
            new_input.val = e.target.value;
        }

        input.event_callback({ input });
    },
    's1008');

    @action public remove_val = (
        {
            input,
        }: {
            input: i_inputs.Input;
        },
    ): void => err(() => {
        const new_input = input;

        new_input.val = '';
    },
    's1017');
}
