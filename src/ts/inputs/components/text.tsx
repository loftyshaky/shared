import React from 'react';
import { observer } from 'mobx-react';

import {
    o_inputs,
    d_inputs,
    c_inputs,
} from 'inputs/internal';

import {
    u_settings,
} from 'settings/internal';

interface Props {
    input: o_inputs.Text;
}

export const Text = observer((props: Props) => {
    const { input } = props;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls([
                        'input_w',
                        'text',
                        input.name,
                        'inset_border',
                    ])}
                    style={{
                        minWidth: u_settings.InputsWidth.i.width[input.section!],
                        maxWidth: u_settings.InputsWidth.i.max_width,
                    }}
                >
                    <input
                        id={input.name}
                        className={x.cls([
                            'input',
                            input.text_type,
                            d_inputs.Val.i.warn_state({ input }),
                        ])}
                        type={input.type}
                        value={input.val}
                        autoComplete='off'
                        spellCheck='false'
                        onInput={(e): void => {
                            d_inputs.Val.i.change(
                                {
                                    input,
                                },
                                e,
                            );
                        }}
                        onChange={(): undefined => undefined}
                    />
                    <c_inputs.TextBtn
                        name='remove_val'
                        svg_name='Close'
                        input={input}
                        on_click={() => d_inputs.Val.i.remove_val({ input })}
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
