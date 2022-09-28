import React from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs } from 'inputs/internal';

export const LabelInInputItem: React.FunctionComponent<p_inputs.LabelInInputItem> = observer(
    (props) => {
        const { input } = props;

        return (
            <label className='label_in_input_item' htmlFor={input.name}>
                {d_inputs.LabelInInputItem.i().msg!({ input })}
            </label>
        );
    },
);
