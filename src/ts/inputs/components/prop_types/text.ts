import type { o_inputs } from 'inputs/internal';

export interface Text {
    input: o_inputs.Text;
    id?: string;
    calculate_width: boolean;
    include_label: boolean;
    parent_input?: o_inputs.Group;
}
