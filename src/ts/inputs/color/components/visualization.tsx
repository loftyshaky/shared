import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import { prevent_default, s_tab_index } from 'shared/internal';
import { c_inputs, c_color, d_color, p_color } from 'inputs/internal';

export const Visualization: React.FunctionComponent<p_color.Visualization> = observer((props) => {
    const visualization_w_ref = useRef<HTMLSpanElement>(null);
    const visualization_ref = useRef<HTMLButtonElement>(null);

    const { input, i, aria_label } = props;

    // eslint-disable-next-line no-unused-expressions
    input.state[i];
    const visualization_cls = input.visualization_cls!({ i });
    const palette_visualization_cls = input.palette_visualization_cls!({ i });

    return (
        <span
            className={x.cls([
                visualization_cls ? `${input.visualization_cls!({ i })}_w` : visualization_cls,
                palette_visualization_cls
                    ? `${input.palette_visualization_cls!({ i })}_w`
                    : palette_visualization_cls,
                `${i}_visualization_w`,
                input.inset_border_cls!({ i }), // needed to display palette color pickers at correct position
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
                style={{
                    backgroundColor: d_color.Color.i().access!({
                        input,
                        i,
                    }),
                }}
                ref={visualization_ref}
                onClick={(e: any): void => {
                    d_color.Color.i().select_palette_color(
                        {
                            input,
                            i,
                        },
                        e,
                    );
                }}
                onMouseDown={(e: any): void => {
                    d_color.Visibility.i().change_visibility(
                        {
                            input,
                            i,
                            color_picker_state: 'is_visible',
                        },
                        e,
                    );
                }}
                onMouseEnter={(e: any): void => {
                    d_color.Visibility.i().change_visibility(
                        {
                            input,
                            i,
                            color_picker_state: 'is_initialized',
                        },
                        e,
                    );
                }}
                onFocus={(e: any): void => {
                    d_color.Visibility.i().change_visibility(
                        {
                            input,
                            i,
                            color_picker_state: 'is_initialized',
                        },
                        e,
                    );
                }}
                onKeyDown={(e: any) => {
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
            {i === 'main' ? <c_inputs.Label input={input} /> : undefined}
            {i === 'main' && input.include_help ? (
                <c_inputs.HelpBtn section_or_input={input} />
            ) : undefined}
            <c_color.ColorPicker
                input={input}
                i={i}
                visualization_w_ref={visualization_w_ref}
                visualization_ref={visualization_ref}
            />
        </span>
    );
});
