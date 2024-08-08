import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/internal';
import { d_inputs, p_inputs } from 'inputs/internal';

export const HelpBtn: React.FunctionComponent<p_inputs.HelpBtn> = observer((props) => {
    const { section_or_input } = props;

    return (
        <button
            className='help_btn'
            type='button'
            title={ext.msg('help_btn_title')}
            tabIndex={
                n((section_or_input as any).type) ? (section_or_input as any).tab_index!() : 0
            }
            aria-label='Help button'
            onClick={(): void => {
                d_inputs.Help.change_visibility({ section_or_input });
            }}
        >
            <svg.Help />
        </button>
    );
});
