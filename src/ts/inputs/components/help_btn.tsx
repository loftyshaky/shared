import React from 'react';
import { observer } from 'mobx-react';

import { s_env } from 'shared_clean/internal';
import { svg } from 'shared/internal';
import { d_inputs, p_inputs } from 'inputs/internal';

export const HelpBtn: React.FunctionComponent<p_inputs.HelpBtn> = observer((props) => {
    const { section_or_input } = props;

    return (
        <button
            className='help_btn'
            type='button'
            title={(globalThis as any)[s_env.Env.type()].msg('help_btn_title')}
            tabIndex={d_inputs.TabIndex.tab_index({ section_or_input })}
            aria-label='Help button'
            onClick={(): void => {
                d_inputs.Help.change_visibility({ section_or_input });
            }}
        >
            <svg.Help />
        </button>
    );
});
