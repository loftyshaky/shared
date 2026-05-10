import React from 'react';
import { observer } from 'mobx-react';

import { stop_propagation } from 'shared_clean/internal';
import { c_tr } from 'shared/internal';
import { c_inputs, o_inputs, p_inputs } from 'inputs/internal';

export const IconBtn: React.FunctionComponent<p_inputs.IconBtn> = observer((props) => {
    const { input, include_label } = props;

    return (
        <c_tr.BaseTr
            tag='span'
            name='fade'
            cls={x.cls(['btn_w', input.type, input.is_enabled_cls!(), input.name])}
            attr={{
                title:
                    input instanceof o_inputs.IconBtn
                        ? input.alt_msg ||
                          (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                              `${input.name}_btn_title`,
                          )
                        : '',
                tabIndex: input.tab_index!(),
                onClick: () => {
                    input.event_callback({ input });
                },
                onKeyDown: stop_propagation,
            }}
            state={
                input.is_visible_computed!() &&
                ((input.is_cut && data.settings.prefs.enable_cut_features) || !input.is_cut)
            }
            style={{ marginLeft: x.px(input.offset) }}
        >
            <button className={x.cls(['btn'])} type='button' aria-label={input.name}>
                <input.Svg />
            </button>
            {include_label ? <c_inputs.LabelInInputItem input={input} /> : undefined}
        </c_tr.BaseTr>
    );
});
