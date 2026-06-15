import type { i_inputs, o_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public tab_index = ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): number =>
        err(() => ('type' in section_or_input ? section_or_input.tab_index!() : 0), 'shr_1331');
}

export const TabIndex = Class.get_instance();
