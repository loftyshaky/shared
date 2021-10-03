import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const Btn: React.FunctionComponent<p_inputs.Btn> = observer((props) => {
    const { input } = props;

    return (
        <button
            className={x.cls([
                'btn',
                'text',
                'inset_border',
                ,
                input.parent_disabled_cls!(),
                input.name,
            ])}
            type='button'
            disabled={input.parent_disabled}
            onClick={input.event_callback}
        >
            {ext.msg(`${input.name}_btn_text`) || input.alt_msg}
        </button>
    );
});
