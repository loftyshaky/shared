import { configure, action } from 'mobx';

import { i_inputs } from 'inputs/internal';

configure({ enforceActions: 'observed' });

export class Val {
    private static i0: Val;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

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

        this.set_warn_state({ input });
        input.event_callback({ input });
    },
    's1008');

    @action private set_warn_state = (
        {
            input,
        }: {
            input: i_inputs.Input;
        },
    ): void => err(() => {
        if (n(input.warn_state_checker)) {
            const new_input = input;

            new_input.is_in_warn_state = input.warn_state_checker({ input });
        }
    },
    's1017');
}
