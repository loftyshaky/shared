import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

import {
    d_inputs,
    c_inputs,
    p_inputs,
} from 'inputs/internal';

import { u_settings } from 'settings/internal';

export const Text = observer((props: p_inputs.Text) => {
    const { input } = props;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls([
                        'input_w',
                        'text',
                        input.text_type,
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
                    <input
                        id={input.name}
                        className={x.cls([
                            'input',
                            input.text_type,
                        ])}
                        type={input.text_type}
                        value={d_inputs.Val.i().access({ input })}
                        autoComplete='off'
                        spellCheck='false'
                        onInput={(e): void => {
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
                        onChange={(): undefined => undefined}
                    />
                    <c_inputs.TextBtn
                        name='remove_val'
                        svg_name='Close'
                        input={input}
                        on_click={() => d_inputs.Val.i().remove_val({ input })}
                    />
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
