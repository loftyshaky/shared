import React from 'react';
import { observer } from 'mobx-react';

import { c_tr, stop_propagation } from 'shared/internal';
import { p_inputs } from 'inputs/internal';

export const LinkBtn: React.FunctionComponent<p_inputs.LinkBtn> = observer((props) => {
    const { input } = props;

    return (
        <c_tr.BaseTr
            tag='button'
            name='fade'
            cls={x.cls(['btn', 'link_btn', input.is_enabled_cls!(), input.name])}
            attr={{
                type: 'button',
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
            {ext.msg(`${input.name}_link_btn_text`)}
        </c_tr.BaseTr>
    );
});
