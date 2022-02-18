import React, { useEffect, useRef, MouseEvent } from 'react';
import { observer } from 'mobx-react';

import { c_tr } from 'shared/internal';
import { c_color, d_color, s_color, p_color, i_color } from 'inputs/internal';

export const ColorPicker: React.FunctionComponent<p_color.ColorPicker> = observer((props) => {
    const pickr_ref = useRef<any>(null);
    const color_picker_ref = useRef<HTMLSpanElement>(null);
    const color_picker_is_initialized_ref = useRef<boolean>(false);

    useEffect(() =>
        err(() => {
            const { input, i } = props;

            if (
                !color_picker_is_initialized_ref.current &&
                n(input.state) &&
                input.state[i as keyof i_color.ColorPickerState].is_initialized
            ) {
                color_picker_is_initialized_ref.current = true;

                init();
            }

            if (n(color_picker_ref.current)) {
                s_color.ColorPicker.i().update({
                    pickr: pickr_ref.current,
                    color_picker: color_picker_ref.current,
                    input,
                    i,
                });
            }
        }, 'shr_1003'),
    );

    const init = (): Promise<void> =>
        err_async(async () => {
            const { visualization_ref } = props;

            if (n(color_picker_ref.current) && n(visualization_ref.current)) {
                const { input, i } = props;

                pickr_ref.current = await s_color.ColorPicker.i().init({
                    input,
                    i,
                    color_picker: color_picker_ref.current,
                    visualization: visualization_ref.current,
                });
            }
        }, 'shr_1004');

    const { input, i } = props;

    return n(input.state) &&
        (input.state[i as keyof i_color.ColorPickerState].is_initialized ||
            input.state[i as keyof i_color.ColorPickerState].is_visible) ? (
        <span className='inner_w'>
            <c_color.FillShadow
                is_visible={input.state[i as keyof i_color.ColorPickerState].is_visible}
                width={x.px(input.color_picker_width)}
                height={x.px(input.color_picker_height)}
            />
            <c_tr.BaseTr
                tag='span'
                name='fade'
                cls='color_picker_w'
                state={input.state[i as keyof i_color.ColorPickerState].is_visible}
                tr_end_unactive={[
                    (): void => {
                        d_color.Visibility.i().mark_color_picker_as_closed({
                            input,
                            i,
                            is_closed: true,
                        });
                    },
                ]}
            >
                <span
                    className={x.cls([
                        'color_picker',
                        input.color_picker_is_closed_visibility_cls!({
                            i,
                        }),
                    ])}
                    onContextMenu={(e: MouseEvent): void => {
                        e.stopPropagation();
                    }}
                    ref={color_picker_ref}
                />
            </c_tr.BaseTr>
        </span>
    ) : null;
});
