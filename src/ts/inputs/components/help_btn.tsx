import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/internal';
import {
    d_inputs,
    o_inputs,
    i_inputs,
} from 'inputs/internal';

interface Props {
    section_or_input: o_inputs.Section | i_inputs.Input;
}

export const HelpBtn = observer((props: Props) => {
    const { section_or_input } = props;

    return (
        <button
            className='help_btn'
            type='button'
            title={ext.msg('help_btn_title')}
            onClick={(): void => { d_inputs.HelpVisibility.i.change({ section_or_input }); }}
        >
            <svg.Help />
        </button>
    );
});
