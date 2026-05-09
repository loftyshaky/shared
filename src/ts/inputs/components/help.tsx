import React from 'react';
import { observer } from 'mobx-react';

import { c_tr } from 'shared/internal';
import { d_inputs, p_inputs } from 'inputs/internal';

export const Help: React.FunctionComponent<p_inputs.Help> = observer((props) => {
    const { section_or_input } = props;
    const msg: string | undefined = d_inputs.Help.msg!({ section_or_input });

    return (
        <c_tr.BaseTr
            tag='p'
            name='fade'
            cls='help'
            state={section_or_input.help_is_visible as boolean}
            style={{
                width: d_inputs.Help.width_style!({ section_or_input }),
            }}
            tr_end_unactive={[
                (e) => {
                    d_inputs.SideBtn.set_side_btns_offset_bottom_val_help_tr_end(
                        {
                            section_or_input,
                        },
                        e,
                    );
                },
            ]}
        >
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{ __html: n(msg) ? msg : '' }} />
        </c_tr.BaseTr>
    );
});
