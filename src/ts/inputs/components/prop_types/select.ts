import type { o_inputs } from 'inputs/internal';

export interface Select {
    input: o_inputs.Select;
    id?: string;
    calculate_width: boolean;
    include_label: boolean;
}
