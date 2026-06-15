import type { i_inputs, o_inputs } from 'inputs/internal';

export interface Group {
    input: o_inputs.Group;
    inputs?: i_inputs.Inputs;
    calculate_width: boolean;
}
