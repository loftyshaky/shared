import React from 'react';
import { observer } from 'mobx-react';

import { o_inputs, d_inputs, c_inputs, p_inputs } from 'inputs/internal';

export const Select: React.FunctionComponent<p_inputs.Select> = observer((props) => {
    const { input, calculate_width, include_label } = props;
    const options = input.options[input.name];

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls([
                        'input_w',
                        'select',
                        input.name,
                        'inset_border',
                        d_inputs.InputWidth.calculate_width_cls({ calculate_width }),
                        d_inputs.Val.focus_state({ input }),
                    ])}
                    style={{
                        minWidth: d_inputs.InputWidth.min_width_style!({
                            input,
                            calculate_width,
                        }),
                        maxWidth: d_inputs.InputWidth.max_width_style!(),
                    }}
                >
                    <select
                        id={input.name}
                        name={input.name}
                        className='input'
                        value={d_inputs.Val.access({ input }) as string}
                        tabIndex={input.tab_index!()}
                        onChange={(e): void => {
                            d_inputs.Val.change(
                                {
                                    input,
                                },
                                e,
                            );
                        }}
                        onFocus={(): void => {
                            d_inputs.Val.set_focus_state({
                                input,
                                state: true,
                            });
                        }}
                        onBlur={(): void => {
                            d_inputs.Val.set_focus_state({
                                input,
                                state: false,
                            });
                        }}
                    >
                        {options.map(
                            (option: o_inputs.Option, i: number): JSX.Element => (
                                <option key={i} value={option.val}>
                                    {input.option_text!({ i })}
                                </option>
                            ),
                        )}
                    </select>
                </span>
                {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
            </div>
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    );

    return <c_inputs.InputItem input={input} input_w={input_w} include_label={include_label} />;
});
