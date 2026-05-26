import React from 'react';
import { observer } from 'mobx-react';

import { stop_propagation } from 'shared_clean/internal';
import { c_tr } from 'shared/internal';
import { p_inputs, o_inputs } from 'inputs/internal';

export const Btn: React.FunctionComponent<p_inputs.Btn> = observer((props) => {
    const { input } = props;

    return (
        <c_tr.BaseTr
            tag='span'
            name='fade'
            cls={x.cls(['btn_w', 'text', input.is_enabled_cls!(), input.name])}
            state={input.cut_features_is_visible_computed!()}
            attr={{
                tab_index: input.tab_index!(),
                disabled: !input.is_enabled_final!(),
                onClick: input.event_callback,
                onKeyDown: stop_propagation,
            }}
            style={{ marginLeft: x.px(input.offset) }}
        >
            <button className={x.cls(['btn', 'text'])} type='button'>
                {(input as o_inputs.Btn).btn_text!()}
            </button>
        </c_tr.BaseTr>
    );
});
