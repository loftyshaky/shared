import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

import {
    o_inputs,
    d_inputs,
    c_inputs,
    p_inputs,
} from 'inputs/internal';

import { u_settings } from 'settings/internal';

export const Select = observer((props: p_inputs.Select) => {
    const { input } = props;
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
                        'calculate_width',
                        d_inputs.Val.i().focus_state({ input }),
                        d_inputs.Val.i().warn_state({ input }),
                    ])}
                    style={{
                        minWidth: u_settings.InputsWidth.i().width[input.section!],
                        maxWidth: _.isNaN(u_settings.InputsWidth.i().max_width)
                            ? 0
                            : u_settings.InputsWidth.i().max_width,
                    }}
                >
                    <select
                        id={input.name}
                        className='input'
                        value={d_inputs.Val.i().access({ input })}
                        onChange={(e): void => {
                            d_inputs.Val.i().change(
                                {
                                    input,
                                },
                                e,
                            );
                        }}
                        onFocus={(): void => {
                            d_inputs.Val.i().set_focus_state(
                                {
                                    input,
                                    state: true,
                                },
                            );
                        }}
                        onBlur={(): void => {
                            d_inputs.Val.i().set_focus_state(
                                {
                                    input,
                                    state: false,
                                },
                            );
                        }}
                    >
                        {
                            options.map((option: o_inputs.Option, i: number): JSX.Element => (
                                <option
                                    key={i}
                                    value={option.val}
                                >
                                    { input.option_text!({ i })}
                                </option>
                            ))
                        }
                    </select>
                </span>
                {
                    input.include_help
                        ? <c_inputs.HelpBtn section_or_input={input} />
                        : undefined
                }
            </div>
            {
                input.include_help
                    ? <c_inputs.Help section_or_input={input} />
                    : undefined
            }
        </>
    );

    return (
        <c_inputs.InputItem
            input={input}
            input_w={input_w}
            include_label
        />
    );
});
