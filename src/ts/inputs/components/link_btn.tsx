import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const LinkBtn: React.FunctionComponent<p_inputs.LinkBtn> = observer((props) => {
    const { input } = props;

    return (
        <button
            className={x.cls(['btn', 'link_btn', input.parent_disabled_cls!(), input.name])}
            type='button'
            disabled={input.parent_disabled}
            onClick={input.event_callback}
        >
            {ext.msg(`${input.name}_link_btn_text`)}
        </button>
    );
});
