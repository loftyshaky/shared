import type { i_color, o_color } from 'inputs/internal';

export interface Visualization {
    input: o_color.Color;
    i: i_color.I;
    aria_label?: string;
}
