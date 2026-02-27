import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, i_inputs, p_inputs } from 'inputs/internal';

export const SideBtns: React.FunctionComponent<p_inputs.SideBtns> = observer((props) => {
    const { input } = props;

    return n(input.side_btns) ? (
        <span className='side_btns'>
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
