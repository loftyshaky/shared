import type { RefObject } from 'react';

import type { i_color, o_color } from 'inputs/internal';

export interface ColorPicker {
    input: o_color.Color;
    i: i_color.I;
    visualization_ref: RefObject<HTMLButtonElement | null>;
}
