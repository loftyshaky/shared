import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs } from 'inputs/internal';

export const InputError: React.FunctionComponent<p_inputs.InputError> = observer((props) => {
    const { input } = props;
    const input_error_ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        (async () => {
            d_inputs.SideBtn.set_side_btns_offset_bottom_val({
                input,
                el: input_error_ref.current,
            });
        })();
    }, [input.is_in_warn_state, input]);

    return (
        <p
            className={x.cls([
                'input_error',
                d_inputs.InputError.input_error_visibility_cls!({ input }),
            ])}
            style={{
                width: d_inputs.Help.width_style!({ section_or_input: input }),
            }}
            ref={input_error_ref}
        >
            {d_inputs.InputError.input_error!({ input })}
        </p>
    );
});
