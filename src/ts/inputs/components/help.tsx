import React from 'react';
import { observer } from 'mobx-react';

import { c_tr } from 'shared/internal';
import { p_inputs, i_inputs } from 'inputs/internal';
import { u_settings } from 'settings/internal';

export const Help: React.FunctionComponent<p_inputs.Help> = observer((props) => {
    const { section_or_input } = props;
    const section_name: string | undefined = (section_or_input as i_inputs.Input).section;
    const is_input: boolean = n(section_name);

    return (
        <c_tr.BaseTr
            tag='p'
            name='fade'
            cls='help'
            state={section_or_input.help_is_visible as boolean}
            style={{
                width: is_input ? u_settings.InputsWidth.i().width[section_name!] : '',
            }}
        >
            {ext.msg(`${section_or_input.name}_help_text`) || section_or_input.alt_help_msg}
        </c_tr.BaseTr>
    );
});
