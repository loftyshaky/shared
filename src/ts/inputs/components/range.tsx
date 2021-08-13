import React from 'react';
import { observer } from 'mobx-react';

import { d_inputs, c_inputs, p_inputs } from 'inputs/internal';

export const Range: React.FunctionComponent<p_inputs.Range> = observer((props) => {
    const { input } = props;

    const input_w: JSX.Element = (
        <>
            <div className='displayed_val_w'>
                <div className='input_w_and_help_btn'>
                    <span
                        className={x.cls(['input_w', 'range', input.name, 'calculate_width'])}
                        style={{
                            minWidth: d_inputs.InputWidth.i().min_width_style!({ input }),
                            maxWidth: d_inputs.InputWidth.i().max_width_style!(),
                        }}
                    >
                        <input
                            id={input.name}
                            className={x.cls(['input', d_inputs.Val.i().focus_state({ input })])}
                            type='range'
                            value={d_inputs.Val.i().access({ input }) as string}
                            autoComplete='off'
                            min={input.min}
                            max={input.max}
                            step={input.step}
                            onInput={(e): void => {
                                d_inputs.Val.i().change(
                                    {
                                        input,
                                    },
                                    e,
                                );
                            }}
                            onFocus={(): void => {
                                d_inputs.Val.i().set_focus_state({
                                    input,
                                    state: true,
                                });
                            }}
                            onBlur={(): void => {
                                d_inputs.Val.i().set_focus_state({
                                    input,
                                    state: false,
                                });
                            }}
                        />
                        <span
                            className='lower_fill'
                            style={{ width: input.lower_fill_width!({ input }) }}
                        />
                    </span>
                    {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
                </div>
                <div className={x.cls(['displayed_val', input.help_is_present_cls!({ input })])}>
                    {input.displayed_val!({ input })}
                </div>
            </div>
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    );

    return <c_inputs.InputItem input={input} input_w={input_w} include_label />;
});
