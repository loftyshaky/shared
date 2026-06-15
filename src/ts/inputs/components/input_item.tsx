import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { c_inputs, d_inputs, type p_inputs } from 'inputs/internal';
import { c_tr } from 'shared/internal';

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
                state={input.cut_features_is_visible_computed!()}
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
