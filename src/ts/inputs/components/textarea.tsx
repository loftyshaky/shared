import React from 'react';
import { observer } from 'mobx-react';

import { d_inputs, c_inputs, p_inputs } from 'inputs/internal';

export const Textarea: React.FunctionComponent<p_inputs.Textarea> = observer((props) => {
    const { input, calculate_width, include_label } = props;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls([
                        'input_w',
                        'textarea',
                        input.name,
                        'inset_border',
                        d_inputs.InputWidth.calculate_width_cls({ calculate_width }),
                        d_inputs.Val.focus_state({ input }),
                        d_inputs.Val.warn_state({ input }),
                    ])}
                    style={{
                        minWidth: d_inputs.InputWidth.min_width_style!({
                            input,
                            calculate_width,
                        }),
                        maxWidth: d_inputs.InputWidth.max_width_style!(),
                    }}
                >
                    <textarea
                        id={input.name}
                        name={input.name}
                        className='input'
                        value={d_inputs.Val.access({ input }) as string}
                        spellCheck='false'
                        tabIndex={input.tab_index!()}
                        onInput={async (e): Promise<void> => {
                            await d_inputs.Val.text_and_textarea_on_input({ input }, e);
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
                    />
                </span>
                {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
            </div>
            <c_inputs.InputError input={input} />
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    );

    return <c_inputs.InputItem input={input} input_w={input_w} include_label={include_label} />;
});
