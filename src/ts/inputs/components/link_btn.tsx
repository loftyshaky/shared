import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const LinkBtn = observer((props: p_inputs.LinkBtn) => {
    const { name, on_click } = props;

    return (
        <button className={x.cls(['btn', 'link_btn', name])} type='button' onClick={on_click}>
            {ext.msg(`${name}_link_btn_text`)}
        </button>
    );
});
