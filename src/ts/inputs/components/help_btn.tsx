import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/internal';
import { d_inputs, p_inputs, i_inputs } from 'inputs/internal';

export const HelpBtn: React.FunctionComponent<p_inputs.HelpBtn> = observer((props) => {
    const { section_or_input } = props;

    return (
        <button
            className='help_btn'
            type='button'
            title={ext.msg('help_btn_title')}
            disabled={(section_or_input as i_inputs.Input).parent_disabled}
            onClick={(): void => {
                d_inputs.Help.i().change_visibility({ section_or_input });
            }}
        >
            <svg.Help />
        </button>
    );
});
