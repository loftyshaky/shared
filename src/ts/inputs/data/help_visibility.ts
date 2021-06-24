import { makeObservable, action } from 'mobx';

import { o_inputs, i_inputs } from 'inputs/internal';

export class HelpVisibility {
    private static i0: HelpVisibility;

    public static i(): HelpVisibility {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            change: action,
        });
    }

    public change = ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): void =>
        err(() => {
            const new_input: o_inputs.Section | i_inputs.Input = section_or_input;

            new_input.help_is_visible = !new_input.help_is_visible;
        }, 'shr_1027');
}