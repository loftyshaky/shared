import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { c_inputs, d_inputs, i_inputs, p_inputs } from 'inputs/internal';

export const SideBtns: React.FunctionComponent<p_inputs.SideBtns> = observer((props) => {
    const { input } = props;
    const side_btns_ref = useRef<HTMLElement>(null);

    useEffect(() => {
        (async () => {
            if (input.help_is_visible) {
                d_inputs.SideBtn.set_side_btns_offset_bottom_val({
                    input,
                    el: side_btns_ref.current,
                });
            }
        })();
    }, [input.help_is_visible, input]);

    return n(input.side_btns) ? (
        <span
            className='side_btns'
            ref={side_btns_ref}
            style={{ bottom: input.side_btns_offset_bottom }}
        >
            {input.side_btns.map(
                (side_btn: i_inputs.SideBtn, i: number): JSX.Element => (
                    <c_inputs.SideBtn
                        key={i}
                        name={side_btn.name}
                        Svg={side_btn.Svg}
                        input={input}
                        on_click={(): void => {
                            side_btn.event_callback({
                                input,
                            });
                        }}
                    />
                ),
            )}
        </span>
    ) : null;
});
