import React from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs } from 'inputs/internal';

export const InputError: React.FunctionComponent<p_inputs.InputError> = observer((props) => {
    const { input } = props;

    return (
        <p
            className={x.cls([
                'input_error',
                d_inputs.InputError.i().input_error_visibility_cls!({ input }),
            ])}
            style={{
                width: d_inputs.Help.i().width_style!({ section_or_input: input }),
            }}
        >
            {d_inputs.InputError.i().input_error!({ input })}
        </p>
    );
});
