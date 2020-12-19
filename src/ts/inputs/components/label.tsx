import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const Label = observer((props: p_inputs.Label) => {
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
