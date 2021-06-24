import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const Label: React.FunctionComponent<p_inputs.Label> = observer((props) => {
    const { input } = props;

    return (
        <label className='label' htmlFor={input.name}>
            {ext.msg(`${input.name}_label_text`) || input.alt_msg}
        </label>
    );
});
