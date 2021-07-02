import { RefObject } from 'react';

import { o_color, i_color } from 'inputs/internal';

export interface ColorPicker {
    input: o_color.Color;
    i: i_color.I;
    visualization_ref: RefObject<HTMLButtonElement>;
}
