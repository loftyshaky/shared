import React from 'react';
import { observer } from 'mobx-react';

import { c_tr } from 'shared/internal';
import { d_inputs, p_inputs } from 'inputs/internal';

export const Help: React.FunctionComponent<p_inputs.Help> = observer((props) => {
    const { section_or_input } = props;

    return (
        <c_tr.BaseTr
            tag='p'
            name='fade'
            cls='help'
            state={section_or_input.help_is_visible as boolean}
            style={{
                width: d_inputs.Help.i().width_style!({ section_or_input }),
            }}
        >
            {d_inputs.Help.i().msg!({ section_or_input })}
        </c_tr.BaseTr>
    );
});
