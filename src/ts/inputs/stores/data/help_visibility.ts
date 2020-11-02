import { configure, action } from 'mobx';

import { o_inputs, i_inputs } from 'inputs/internal';

configure({ enforceActions: 'observed' });

export class HelpVisibility {
    private static i0: HelpVisibility;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    @action public change = (
        {
            section_or_input,
        }: {
            section_or_input: o_inputs.Section | i_inputs.Input
        },
    ): void => err(() => {
        const new_input: o_inputs.Section | i_inputs.Input = section_or_input;

        new_input.help_is_visible = !new_input.help_is_visible;
    },
    's1009');
}
