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
            cls={x.cls(['btn', 'text', 'inset_border', input.is_enabled_cls!(), input.name])}
            attr={{
                type: (input as o_inputs.Btn).btn_type,
                tabIndex: input.tab_index!(),
                onClick: input.event_callback,
                onKeyDown: stop_propagation,
            }}
            state={
                input.is_visible_computed!() &&
                ((input.is_cut && data.settings.enable_cut_features) || !input.is_cut)
            }
            style={{ marginLeft: x.px(input.offset) }}
        >
            {ext.msg(`${input.name}_btn_text`) || input.alt_msg}
        </c_tr.BaseTr>
    );
});
