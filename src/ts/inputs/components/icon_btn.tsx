import React from 'react';
import { observer } from 'mobx-react';

import { stop_propagation } from 'shared_clean/internal';
import { c_tr } from 'shared/internal';
import { c_inputs, p_inputs } from 'inputs/internal';

export const IconBtn: React.FunctionComponent<p_inputs.IconBtn> = observer((props) => {
    const { input, include_label } = props;

    return (
        <c_tr.BaseTr
            tag='span'
            name='fade'
            cls={x.cls(['btn_w', input.type, input.is_enabled_cls!(), input.name])}
            attr={{
                title: input.icon_btn_title!(),
                onClick: () => {
                    input.event_callback({ input });
                },
                onKeyDown: stop_propagation,
            }}
            state={input.cut_features_is_visible_computed!()}
            style={{ marginLeft: x.px(input.offset) }}
        >
            <button
                className={x.cls(['btn'])}
                type='button'
                aria-label={input.name}
                tabIndex={input.tab_index!()}
            >
                <input.Svg />
            </button>
            {include_label ? <c_inputs.LabelInInputItem input={input} /> : undefined}
        </c_tr.BaseTr>
    );
});
