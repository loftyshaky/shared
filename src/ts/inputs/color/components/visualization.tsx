import { observer } from 'mobx-react-lite';
import { type FocusEvent, type KeyboardEvent, type MouseEvent, useRef } from 'react';

import { c_color, c_inputs, d_color, type p_color } from 'inputs/internal';
import { s_tab_index } from 'shared/internal';
import type { t } from 'shared_clean/internal';
import { prevent_default, s_env } from 'shared_clean/internal';

export const Visualization: React.FunctionComponent<p_color.Visualization> = observer((props) => {
    const visualization_w_ref = useRef<HTMLSpanElement>(null);
    const visualization_ref = useRef<HTMLButtonElement>(null);
    const { input, i, aria_label } = props;
    const visualization_cls = input.visualization_cls!({ i });
    const palette_visualization_cls = input.palette_visualization_cls!({ i });

    // oxlint-disable-next-line no-unused-expressions
    n(input.state) && input.state.main;

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
                        backgroundColor: d_color.Color.access({
                            input,
                            i,
                        }),
                    }}
                    ref={visualization_ref}
                    onClick={(e: MouseEvent): void => {
                        d_color.Color.select_palette_color(
                            {
                                input,
                                i,
                            },
                            e,
                        );
                    }}
                    onMouseDown={(e: MouseEvent): void => {
                        void d_color.Visibility.change_visibility(
                            {
                                input,
                                i,
                                color_picker_state: 'is_visible',
                            },
                            e,
                        );
                    }}
                    onMouseEnter={(e: MouseEvent): void => {
                        void d_color.Visibility.change_visibility(
                            {
                                input,
                                i,
                                color_picker_state: 'is_initialized',
                            },
                            e,
                        );
                    }}
                    onFocus={(e: FocusEvent): void => {
                        void d_color.Visibility.change_visibility(
                            {
                                input,
                                i,
                                color_picker_state: 'is_initialized',
                            },
                            e,
                        );
                    }}
                    onKeyDown={(e: KeyboardEvent) => {
                        s_tab_index.TabIndex.simulate_color_visualization_click_on_enter(
                            {
                                input,
                                i,
                            },
                            e,
                        );
                    }}
                >
                    {(globalThis as t.AnyRecord)[s_env.Env.type()].msg(`${i}_color_btn_text`)}
                </button>
                <c_color.ColorPicker input={input} i={i} visualization_ref={visualization_ref} />
            </span>
            {i === 'main' ? <c_inputs.LabelInInputItem input={input} /> : undefined}
            {i === 'main' && input.include_help ? (
                <c_inputs.HelpBtn section_or_input={input} />
            ) : undefined}
        </>
    );
});
