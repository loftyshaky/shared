import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/internal';

import {
    d_inputs,
    p_inputs,
} from 'inputs/internal';

export const TextBtn = observer((props: p_inputs.TextBtn) => {
    const {
        input,
        name,
        svg_name,
        on_click,
    } = props;
    const Svg = svg[svg_name];

    return (
        <>
            <button
                className={x.cls([
                    'btn',
                    'text_input',
                    input.remove_val_btn_is_visible!({ input }),
                    d_inputs.Val.i.warn_state({ input }),
                ])}
                type='button'
                title={ext.msg(`${name}_text_input_btn_title`)}
                onClick={on_click}
            >
                <Svg />
            </button>
        </>
    );
});
