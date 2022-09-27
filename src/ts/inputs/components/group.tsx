import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, d_inputs, s_inputs, o_inputs, p_inputs, i_inputs } from 'inputs/internal';

export const Group: React.FunctionComponent<p_inputs.Group> = observer((props) => {
    const { input } = props;

    const input_w: JSX.Element = n(input.inputs) ? (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls(['input_w', 'group', input.name, 'calculate_width'])}
                    style={{
                        minWidth: d_inputs.InputWidth.i().min_width_style!({ input }),
                        maxWidth: d_inputs.InputWidth.i().max_width_style!(),
                    }}
                >
                    {Object.values(input.inputs).map(
                        (input_2: i_inputs.Input | o_inputs.Link, i: number): JSX.Element => (
                            <React.Fragment key={i}>
                                {s_inputs.resolve({ input: input_2, calculate_width: false })}
                            </React.Fragment>
                        ),
                    )}
                </span>
                {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
            </div>
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
    );

    return <c_inputs.InputItem input={input} input_w={input_w} include_label />;
});
