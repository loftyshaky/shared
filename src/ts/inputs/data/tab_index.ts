import { o_inputs, i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public tab_index = ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): number =>
        err(
            () => (n((section_or_input as any).type) ? (section_or_input as any).tab_index!() : 0),
            'shr_1331',
        );
}

export const TabIndex = Class.get_instance();
