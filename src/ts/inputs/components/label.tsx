import React from 'react';
import { observer } from 'mobx-react';

import { i_inputs } from 'inputs/internal';

interface Props {
    input: i_inputs.Input;
}

export const Label = observer((props: Props) => {
    const { input } = props;

    return (
        <label
            className='label'
            htmlFor={input.name}
        >
            {
                ext.msg(`${input.name}_label_text`)
                || input.alt_msg
            }
        </label>
    );
});
