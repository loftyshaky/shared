import {
    o_inputs,
    o_color,
} from 'inputs/internal';

export type Input =
o_inputs.Text
| o_inputs.Textarea
| o_inputs.Checkbox
| o_inputs.Select
| o_color.Color
| o_inputs.Btn
| o_inputs.File;
