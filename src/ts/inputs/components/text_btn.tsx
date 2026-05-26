import React from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs } from 'inputs/internal';

export const TextBtn: React.FunctionComponent<p_inputs.TextBtn> = observer((props) => {
    const { input, name, Svg, on_click } = props;

    return (
        <button
            className={x.cls(['btn', 'text_input', d_inputs.Val.warn_state({ input })])}
            type='button'
            title={input.text_btn_title!({ name })}
            tabIndex={input.tab_index!()}
            aria-label='Text button'
            onClick={on_click}
        >
            <Svg />
        </button>
    );
});
