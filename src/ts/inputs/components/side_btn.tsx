import React from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs } from 'inputs/internal';

export const SideBtn: React.FunctionComponent<p_inputs.SideBtn> = observer((props) => {
    const { input, name, Svg, on_click } = props;

    return (
        <button
            className={x.cls([
                'btn',
                'side_btn',
                d_inputs.SideBtn.is_enabled_cls!({ name, input }),
            ])}
            type='button'
            title={(globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                `${name}_side_btn_title`,
            )}
            tabIndex={input.tab_index!()}
            aria-label='Side button'
            onClick={on_click}
        >
            <Svg />
        </button>
    );
});
