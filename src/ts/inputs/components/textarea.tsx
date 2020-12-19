import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

import {
    d_inputs,
    c_inputs,
    p_inputs,
} from 'inputs/internal';

import { u_settings } from 'settings/internal';

export const Textarea = observer((props: p_inputs.Textarea) => {
    const { input } = props;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls([
                        'input_w',
                        'textarea',
                        input.name,
                        'inset_border',
                        'calculate_width',
                        d_inputs.Val.i.focus_state({ input }),
                        d_inputs.Val.i.warn_state({ input }),
                    ])}
                    style={{
                        minWidth: u_settings.InputsWidth.i.width[input.section!],
                        maxWidth: _.isNaN(u_settings.InputsWidth.i.max_width)
                            ? 0
                            : u_settings.InputsWidth.i.max_width,
                    }}
                >
                    <textarea
                        id={input.name}
                        className='input'
                        value={d_inputs.Val.i.access({ input })}
                        spellCheck='false'
                        onInput={(e): void => {
                            d_inputs.Val.i.change(
                                {
                                    input,
                                },
                                e,
                            );
                        }}
                        onChange={() => undefined}
                        onFocus={(): void => {
                            d_inputs.Val.i.set_focus_state(
                                {
                                    input,
                                    state: true,
                                },
                            );
                        }}
                        onBlur={(): void => {
                            d_inputs.Val.i.set_focus_state(
                                {
                                    input,
                                    state: false,
                                },
                            );
                        }}
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
