import type { o_inputs } from 'inputs/internal';

export interface Range {
    input: o_inputs.Range;
    id?: string;
    calculate_width: boolean;
    include_label: boolean;
}
