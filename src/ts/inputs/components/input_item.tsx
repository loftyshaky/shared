import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs, c_inputs } from 'inputs/internal';

export const InputItem: React.FunctionComponent<p_inputs.InputItem> = observer(
    (props: p_inputs.InputItem) => {
        const { input, input_w, include_label } = props;

        useEffect(() => {
            d_inputs.NestedInput.i().calculate_offset({ input });
        });

        return (
            <div
                className={x.cls([
                    'input_item',
                    input.type,
                    input.name,
                    input.parent_disabled_cls!(),
                ])}
                style={{ marginLeft: input.offset }}
            >
                {include_label ? <c_inputs.Label input={input} /> : undefined}
                {input_w}
            </div>
        );
    },
);
