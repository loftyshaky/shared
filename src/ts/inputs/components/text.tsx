import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/internal';
import { d_inputs, c_inputs, p_inputs, i_inputs } from 'inputs/internal';

export const Text: React.FunctionComponent<p_inputs.Text> = observer((props) => {
    const input_ref = useRef<HTMLInputElement>(null);
    const { input, calculate_width, include_label } = props;

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
                        d_inputs.InputWidth.calculate_width_cls({
                            calculate_width,
                        }),
                        d_inputs.Val.focus_state({ input }),
                        d_inputs.Val.warn_state({ input }),
                    ])}
                    style={{
                        width: d_inputs.InputWidth.width_style!({
                            input,
                            calculate_width,
                        }),
                    }}
                >
                    <input
                        id={input.name}
                        name={input.name}
                        className={x.cls(['input', input.text_type])}
                        type={input.text_type}
                        value={d_inputs.Val.access({ input }) as string}
                        placeholder={input.placeholder}
                        autoComplete={input.autocomplete}
                        spellCheck='false'
                        tabIndex={input.tab_index!()}
                        ref={input_ref}
                        onInput={async (e): Promise<void> => {
                            await d_inputs.Val.text_and_textarea_on_input({ input }, e);
                        }}
                        onPaste={(e): void => {
                            input.paste_callback!(
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
                        onWheel={() => {
                            input.prevent_number_val_changeon_scroll!({ input });
                        }}
                    />
                    {n(input.text_btns)
                        ? input.text_btns.map(
                              (text_btn: i_inputs.TextBtn, i: number): JSX.Element =>
                                  n(text_btn.visibility_cond) &&
                                  text_btn.visibility_cond({ input }) ? (
                                      <c_inputs.TextBtn
                                          key={i}
                                          name={text_btn.name}
                                          Svg={text_btn.Svg}
                                          input={input}
                                          on_click={(): void => {
                                              d_inputs.Text.run_text_btn_action({
                                                  input,
                                                  text_btn,
                                                  input_el: n(input_ref.current)
                                                      ? input_ref.current
                                                      : undefined,
                                              });
                                          }}
                                      />
                                  ) : (
                                      <React.Fragment key={i} />
                                  ),
                          )
                        : undefined}
                    {input.remove_val_btn_is_visible!({ input }) ? (
                        <c_inputs.TextBtn
                            name='remove_val'
                            Svg={svg.Close}
                            input={input}
                            on_click={() =>
                                d_inputs.Val.remove_val({
                                    input,
                                    input_el: input_ref.current,
                                })
                            }
                        />
                    ) : undefined}
                </span>
                {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
            </div>
            <c_inputs.InputError input={input} />
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    );

    return <c_inputs.InputItem input={input} input_w={input_w} include_label={include_label} />;
});
