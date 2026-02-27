import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, d_inputs, o_inputs, p_inputs } from 'inputs/internal';

export const LabelInInputItem: React.FunctionComponent<p_inputs.LabelInInputItem> = observer(
    (props) => {
        const { input } = props;

        return (
            <div
                className={x.cls([
                    'label_in_input_item_w',
                    n((input as o_inputs.Group).content_is_visible_margin_cls)
                        ? (input as o_inputs.Group).content_is_visible_margin_cls!()
                        : '',
                ])}
            >
                {input.type === 'group' ? <c_inputs.SideBtns input={input} /> : undefined}
                <label className='label_in_input_item' htmlFor={input.name}>
                    {d_inputs.LabelInInputItem.msg!({ input })}
                </label>
            </div>
        );
    },
);
