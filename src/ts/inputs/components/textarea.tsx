import type { InputEvent, JSX } from 'react';

import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

import { c_inputs, d_inputs, type p_inputs, s_inputs } from 'inputs/internal';

export const Textarea: React.FunctionComponent<p_inputs.Textarea> = observer((props) => {
    const textarea_ref = useRef<HTMLTextAreaElement>(null);
    const { input, id, calculate_width, include_label } = props;
    const width = d_inputs.InputWidth.width_style!({
        input,
        calculate_width,
    });

    useEffect(() => {
        window.addEventListener('resize', () =>
            d_inputs.InputWidth.resize_textarea_with_resize_handle({
                input,
                textarea: textarea_ref.current,
            }),
        );

        s_inputs.Textarea.set_up_resize_observer({
            input,
            input_el: textarea_ref.current,
        });
    }, [input]);

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
                        minWidth: width,
                        maxWidth: d_inputs.InputWidth.max_width_ob[input.name],
                    }}
                >
                    <textarea
                        id={d_inputs.LabelInInputItem.id({ input, id })}
                        name={input.name}
                        className='input'
                        value={d_inputs.Val.access({ input }) as string}
                        spellCheck='false'
                        tabIndex={input.tab_index!()}
                        ref={textarea_ref}
                        onInput={async (e: InputEvent): Promise<void> => {
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

    return (
        <c_inputs.InputItem
            input={input}
            input_w={input_w}
            include_label={input.label_is_visible_computed!({ include_label })}
        />
    );
});
