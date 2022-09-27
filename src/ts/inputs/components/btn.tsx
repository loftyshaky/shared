import React from 'react';
import { observer } from 'mobx-react';

import { c_tr, stop_propagation } from 'shared/internal';
import { o_inputs, p_inputs } from 'inputs/internal';

export const Btn: React.FunctionComponent<p_inputs.Btn> = observer((props) => {
    const { input } = props;

    return (
        <c_tr.BaseTr
            tag='button'
            name='fade'
            cls={x.cls(['btn', 'text', input.is_enabled_cls!(), input.name])}
            state={
                input.is_visible_computed!() &&
                ((input.is_cut && data.settings.enable_cut_features) || !input.is_cut)
            }
            attr={{
                type: (input as o_inputs.Btn).btn_type,
                tab_index: input.tab_index!(),
                disabled: !input.is_enabled_final!(),
                onClick: input.event_callback,
                onKeyDown: stop_propagation,
            }}
            style={{ marginLeft: x.px(input.offset) }}
        >
            {input.alt_msg || ext.msg(`${input.name}_btn_text`)}
        </c_tr.BaseTr>
    );
});
