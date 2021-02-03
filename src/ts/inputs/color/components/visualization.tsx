import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import { prevent_default } from 'shared/internal';
import {
    c_inputs,
    p_color,
    c_color,
    d_color,
} from 'inputs/internal';

export const Visualization = observer((props: p_color.Visualization) => {
    const visualization_w_ref = useRef<HTMLSpanElement>(null);
    const visualization_ref = useRef<HTMLButtonElement>(null);

    const {
        input,
        i,
        aria_label,
    } = props;

    // eslint-disable-next-line no-unused-expressions
    input.state[i];
    const visualization_cls = input.visualization_cls!({ i });
    const palette_visualization_cls = input.palette_visualization_cls!({ i });

    return (
        <span
            className={x.cls([
                visualization_cls
                    ? `${input.visualization_cls!({ i })}_w`
                    : visualization_cls,
                palette_visualization_cls
                    ? `${input.palette_visualization_cls!({ i })}_w`
                    : palette_visualization_cls,
                `${i}_visualization_w`,
                input.inset_border_cls!({ i }),
                input.visualization_outline_opened!({ i }),
                input.visualization_selected_opened!({ i }),
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
                onClick={(): void => {
                    d_color.Color.i().select_palette_color({
                        input,
                        i,
                    });
                }}
                onMouseDown={(e: any): void => {
                    d_color.Visibility.i().change_visibility({
                        input,
                        i,
                        color_picker_state: 'is_visible',
                    },
                    e);
                }}
                onMouseEnter={(e: any): void => {
                    d_color.Visibility.i().change_visibility({
                        input,
                        i,
                        color_picker_state: 'is_initialized',
                    },
                    e);
                }}
            >
                {ext.msg(`${i}_color_btn_text`)}
            </button>
            {
                i === 'main'
                    ? <c_inputs.Label input={input} />
                    : undefined
            }
            {
                i === 'main' && input.include_help
                    ? <c_inputs.HelpBtn section_or_input={input} />
                    : undefined
            }
            <c_color.ColorPicker
                input={input}
                i={i}
                visualization_w_ref={visualization_w_ref}
                visualization_ref={visualization_ref}
            />
        </span>
    );
});
