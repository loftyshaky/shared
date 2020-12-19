import React from 'react';
import { observer } from 'mobx-react';

import {
    p_inputs,
    c_inputs,
} from 'inputs/internal';

export const InputItem = observer((props: p_inputs.InputItem) => {
    const { input, input_w, include_label } = props;

    return (
        <div
            className={x.cls([
                'input_item',
                input.type,
                input.name,
                n(input.parent)
                    ? 'child'
                    : '',
            ])}
        >
            {include_label
                ? <c_inputs.Label input={input} />
                : undefined}
            {input_w}
        </div>
    );
});
