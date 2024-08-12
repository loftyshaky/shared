import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';

import { svg, s_tab_index } from 'shared/internal';
import { d_inputs, c_inputs, p_inputs } from 'inputs/internal';

export const Checkbox: React.FunctionComponent<p_inputs.Checkbox> = observer((props) => {
    const { input, calculate_width } = props;
    const width_accessed: number | string | undefined = n(input.section)
        ? d_inputs.InputWidth.width
        : 'auto';
    const input_w_ref = useRef<HTMLElement>(null);
    const [width, set_width] = useState('auto');

    useEffect(() => {
        if (n(input_w_ref.current)) {
            const new_width = d_inputs.InputWidth.width_style!({
                input,
                calculate_width,
                input_w: input_w_ref.current,
            });

            if (n(new_width)) {
                set_width(new_width);
            }
        }
    }, [input, calculate_width, width_accessed]);

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls(['input_w', 'checkbox', input.name, 'calculate_width'])}
                    style={{ width }}
                    ref={input_w_ref}
                >
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className='wrap_label'>
                        <input
                            id={input.name}
                            name={input.name}
                            type='checkbox'
                            checked={d_inputs.Val.access({ input }) as boolean}
                            value={(d_inputs.Val.access({ input }) as boolean).toString()}
                            onChange={(e): void => {
                                d_inputs.Val.change(
                                    {
                                        input,
                                    },
                                    e,
                                );
                            }}
                        />
                        <span
                            className='box'
                            role='button'
                            tabIndex={input.tab_index!()}
                            aria-label='Checkbox'
                            onKeyDown={s_tab_index.TabIndex.simulate_click_on_enter}
                        >
                            <svg.Check />
                        </span>
                    </label>
                    <c_inputs.LabelInInputItem input={input} />
                </span>
                {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
            </div>
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    );

    return <c_inputs.InputItem input={input} input_w={input_w} include_label={false} />;
});
