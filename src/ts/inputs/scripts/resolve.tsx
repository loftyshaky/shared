import React from 'react';

import {
    o_inputs,
    c_inputs,
    i_inputs,
} from 'inputs/internal';

export const resolve = (
    {
        input,
    }: {
        input: i_inputs.Input | o_inputs.Link
    },
): JSX.Element => err(() => {
    let input_el;

    if (input.type === 'color') {
        //   input_el = <c_inputs.Color input={input} />;
    } else if (input.type === 'text') {
        input_el = <c_inputs.Text input={input as o_inputs.Text} />;
    } else if (input.type === 'textarea') {
        input_el = <c_inputs.Textarea input={input as o_inputs.Textarea} />;
    } else if (input.type === 'select') {
        //   input_el = <c_inputs.Select input={input} />;
    } else if (input.type === 'checkbox') {
        //   input_el = <c_inputs.Checkbox input={input} />;
    } else if (input.type === 'link') {
        input_el = <c_inputs.Link link={input as o_inputs.Link} />;
    } else if (input.type === 'btns_group') {
        // input_el = <c_inputs.BtnsGroup btns_group={input} />;
    } else if (input.type === 'btn') {
        input_el = <c_inputs.Btn input={input as o_inputs.Btn} />;
    }

    return input_el as JSX.Element;
},
1124);
