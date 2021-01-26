import {
    o_color,
    i_color,
} from 'inputs/internal';

export interface Visualization {
    input: o_color.Color;
    i: i_color.I;
    aria_label?: string;
}
