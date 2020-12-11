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
    input: o_inputs.Textarea;
}

export const Textarea = observer((props: Props) => {
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
                    ])}
                    style={{
                        minWidth: u_settings.InputsWidth.i.width[input.section!],
                        maxWidth: u_settings.InputsWidth.i.max_width,
                    }}
                >
                    <textarea
                        id={input.name}
                        className={x.cls([
                            'input',
                            d_inputs.Val.i.warn_state({ input }),
                        ])}
                        value={input.val}
                        spellCheck='false'
                        onInput={(e): void => {
                            d_inputs.Val.i.change(
                                {
                                    input,
                                },
                                e,
                            );
                        }}
                        onChange={(): null => null}
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
