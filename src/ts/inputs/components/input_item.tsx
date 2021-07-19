import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs, c_inputs } from 'inputs/internal';

export const InputItem: React.FunctionComponent<p_inputs.InputItem> = observer(
    (props: p_inputs.InputItem) => {
        const { input, input_w, include_label } = props;

        useEffect(() =>
            err(() => {
                d_inputs.NestedInput.i().calculate_offset({ input });
            }, 'shr_1044'),
        );

        return input.is_visible &&
            ((input.is_cut && data.settings.enable_cut_features) || !input.is_cut) ? (
            <div
                className={x.cls([
                    'input_item',
                    input.type,
                    input.name,
                    input.parent_disabled_cls!(),
                ])}
                style={{ marginLeft: x.px(input.offset) }}
            >
                {include_label ? <c_inputs.Label input={input} /> : undefined}
                {input_w}
            </div>
        ) : null;
    },
);
