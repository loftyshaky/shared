import React from 'react';
import { observer } from 'mobx-react';

import { i_inputs } from 'inputs/internal';

interface Props {
    input: i_inputs.Input;
}

export const Btn = observer((props: Props) => {
    const { input } = props;

    return (
        <button
            className={x.cls([
                'btn',
                'text',
                'inset_border',
            ])}
            type='button'
            onClick={input.event_callback}
        >
            {ext.msg(`${input.name}_btn_text`)}
        </button>
    );
});
