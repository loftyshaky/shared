import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const Btn: React.FunctionComponent<p_inputs.Btn> = observer((props) => {
    const { input } = props;

    return (
        <button
            className={x.cls(['btn', 'text', 'inset_border'])}
            type='button'
            onClick={input.event_callback}
        >
            {ext.msg(`${input.name}_btn_text`)}
        </button>
    );
});
