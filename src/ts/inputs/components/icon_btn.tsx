import React from 'react';
import { observer } from 'mobx-react';

import { stop_propagation } from 'shared/internal';
import { p_inputs } from 'inputs/internal';

export const IconBtn: React.FunctionComponent<p_inputs.IconBtn> = observer((props) => {
    const { input } = props;

    return (
        <button
            className={x.cls(['btn', 'icon', input.is_enabled_cls!(), input.name])}
            type='button'
            title={ext.msg(`${input.name}_btn_title`) || input.alt_msg}
            tabIndex={input.tab_index!()}
            onClick={input.event_callback}
            onKeyDown={stop_propagation}
        >
            <input.Svg />
        </button>
    );
});
