import React from 'react';

import { c_inputs, c_color, o_inputs, o_color, i_inputs } from 'inputs/internal';

export const resolve = ({
    input,
    calculate_width = true,
}: {
    input: i_inputs.Input | o_inputs.Link;
    calculate_width?: boolean;
}): JSX.Element =>
    err(() => {
        let input_el;

        if (input.type === 'color') {
            input_el = <c_color.Body input={input as o_color.Color} />;
        } else if (input.type === 'text') {
            input_el = (
                <c_inputs.Text input={input as o_inputs.Text} calculate_width={calculate_width} />
            );
        } else if (input.type === 'textarea') {
            input_el = (
                <c_inputs.Textarea
                    input={input as o_inputs.Textarea}
                    calculate_width={calculate_width}
                />
            );
        } else if (input.type === 'select') {
            input_el = (
                <c_inputs.Select
                    input={input as o_inputs.Select}
                    calculate_width={calculate_width}
                />
            );
        } else if (input.type === 'range') {
            input_el = (
                <c_inputs.Range input={input as o_inputs.Range} calculate_width={calculate_width} />
            );
        } else if (input.type === 'checkbox') {
            input_el = <c_inputs.Checkbox input={input as o_inputs.Checkbox} />;
        } else if (input.type === 'link') {
            input_el = <c_inputs.Link link={input as o_inputs.Link} />;
        } else if (input.type === 'btn_group') {
            // input_el = <c_inputs.BtnsGroup btn_group={input} />;
        } else if (input.type === 'btn') {
            input_el = <c_inputs.Btn input={input as o_inputs.Btn} />;
        } else if (input.type === 'icon_btn') {
            input_el = <c_inputs.IconBtn input={input as o_inputs.IconBtn} />;
        } else if (input.type === 'label') {
            input_el = <c_inputs.Label input={input as o_inputs.Label} />;
        } else if (input.type === 'link_btn') {
            input_el = <c_inputs.LinkBtn input={input as o_inputs.LinkBtn} />;
        } else if (input.type === 'file') {
            input_el = <c_inputs.File input={input as o_inputs.File} />;
        } else if (input.type === 'upload_box') {
            input_el = (
                <c_inputs.UploadBox
                    input={input as o_inputs.UploadBox}
                    calculate_width={calculate_width}
                />
            );
        } else if (input.type === 'form') {
            input_el = <c_inputs.Form input={input as o_inputs.Form} />;
        } else if (input.type === 'group') {
            input_el = <c_inputs.Group input={input as o_inputs.Group} />;
        } else if (input.type === 'hr') {
            input_el = <c_inputs.Hr input={input as o_inputs.Hr} />;
        }

        return input_el as JSX.Element;
    }, 'shr_1073');
