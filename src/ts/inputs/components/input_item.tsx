import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_tr } from 'shared/internal';
import { d_inputs, p_inputs, c_inputs } from 'inputs/internal';

export const InputItem: React.FunctionComponent<p_inputs.InputItem> = observer(
    (props: p_inputs.InputItem) => {
        const { input, input_w, include_label } = props;

        useEffect(() =>
            err(() => {
                d_inputs.NestedInput.calculate_offset({ input });
            }, 'shr_1044'),
        );

        return (
            <c_tr.BaseTr
                tag='div'
                name='fade'
                cls={x.cls([
                    'input_item',
                    input.type,
                    input.name,
                    input.is_enabled_cls!(),
                    input.is_column_layout_cond!(),
                ])}
                state={
                    input.is_visible_computed!() &&
                    ((input.is_cut && data.settings.prefs.enable_cut_features) || !input.is_cut)
                }
                style={{ marginLeft: x.px(input.offset) }}
            >
                {input.type === 'group' ? undefined : <c_inputs.SideBtns input={input} />}
                <div className='input_item_inner'>
                    {include_label ? <c_inputs.LabelInInputItem input={input} /> : undefined}
                    {input_w}
                </div>
            </c_tr.BaseTr>
        );
    },
);
