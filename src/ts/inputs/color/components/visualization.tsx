import React, { useRef, MouseEvent, FocusEvent, KeyboardEvent } from 'react';
import { observer } from 'mobx-react';

import { prevent_default, s_tab_index } from 'shared/internal';
import { c_inputs, c_color, d_color, p_color } from 'inputs/internal';

export const Visualization: React.FunctionComponent<p_color.Visualization> = observer((props) => {
    const visualization_w_ref = useRef<HTMLSpanElement>(null);
    const visualization_ref = useRef<HTMLButtonElement>(null);

    const { input, i, aria_label } = props;

    // eslint-disable-next-line no-unused-expressions
    n(input.state) && input.state.main;

    const visualization_cls = input.visualization_cls!({ i });
    const palette_visualization_cls = input.palette_visualization_cls!({ i });

    return (
        <>
            <span
                className={x.cls([
                    visualization_cls ? `${input.visualization_cls!({ i })}_w` : visualization_cls,
                    palette_visualization_cls
                        ? `${input.palette_visualization_cls!({ i })}_w`
                        : palette_visualization_cls,
                    `${i}_visualization_w`,
                    'inset_border',
                    input.visualization_outline_opened!({ i }),
                    input.visualization_outline_selected!({ i }),
                ])}
                ref={visualization_w_ref}
                onContextMenu={prevent_default}
            >
                <button
                    className={x.cls([
                        input.visualization_cls!({ i }),
                        input.palette_visualization_cls!({ i }),
                        `${i}_visualization`,
                    ])}
                    type='button'
                    aria-label={aria_label}
                    tabIndex={input.tab_index!()}
                    style={{
                        backgroundColor: d_color.Color.i().access({
                            input,
                            i,
                        }),
                    }}
                    ref={visualization_ref}
                    onClick={(e: MouseEvent): void => {
                        d_color.Color.i().select_palette_color(
                            {
                                input,
                                i,
                            },
                            e,
                        );
                    }}
                    onMouseDown={(e: MouseEvent): void => {
                        d_color.Visibility.i().change_visibility(
                            {
                                input,
                                i,
                                color_picker_state: 'is_visible',
                            },
                            e,
                        );
                    }}
                    onMouseEnter={(e: MouseEvent): void => {
                        d_color.Visibility.i().change_visibility(
                            {
                                input,
                                i,
                                color_picker_state: 'is_initialized',
                            },
                            e,
                        );
                    }}
                    onFocus={(e: FocusEvent): void => {
                        d_color.Visibility.i().change_visibility(
                            {
                                input,
                                i,
                                color_picker_state: 'is_initialized',
                            },
                            e,
                        );
                    }}
                    onKeyDown={(e: KeyboardEvent) => {
                        s_tab_index.Main.i().simulate_color_visualization_click_on_enter(
                            {
                                input,
                                i,
                            },
                            e,
                        );
                    }}
                >
                    {ext.msg(`${i}_color_btn_text`)}
                </button>
                <c_color.ColorPicker input={input} i={i} visualization_ref={visualization_ref} />
            </span>
            {i === 'main' ? <c_inputs.Label input={input} /> : undefined}
            {i === 'main' && input.include_help ? (
                <c_inputs.HelpBtn section_or_input={input} />
            ) : undefined}
        </>
    );
});
