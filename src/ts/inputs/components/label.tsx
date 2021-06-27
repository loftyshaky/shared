import React from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs } from 'inputs/internal';

export const Label: React.FunctionComponent<p_inputs.Label> = observer((props) => {
    const { input } = props;

    return (
        <label className='label' htmlFor={input.name}>
            {d_inputs.Label.i().msg!({ input })}
        </label>
    );
});
