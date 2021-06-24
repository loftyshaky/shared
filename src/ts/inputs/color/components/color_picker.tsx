import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { c_tr } from 'shared/internal';
import { c_color, d_color, s_color, p_color } from 'inputs/internal';

export const ColorPicker = observer((props: p_color.ColorPicker) => {
    const pickr_ref = useRef<any>(null);
    const color_picker_ref = useRef<HTMLSpanElement>(null);
    const color_picker_is_initialized_ref = useRef<boolean>(false);

    useEffect(() => {
        const { input, i } = props;

        if (!color_picker_is_initialized_ref.current && input.state[i].is_initialized) {
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
    });

    const init = (): Promise<void> =>
        err_async(async () => {
            if (n(color_picker_ref.current)) {
                const color_picker: HTMLSpanElement = color_picker_ref.current;

                if (n(props.visualization_ref)) {
                    const visualization: HTMLButtonElement =
                        props.visualization_ref.current || props.visualization_ref;

                    if (color_picker && visualization) {
                        const { input, i } = props;

                        pickr_ref.current = await s_color.ColorPicker.i().init({
                            input,
                            i,
                            color_picker,
                            visualization,
                        });
                    }
                }
            }
        }, 'shr_1001');

    const { input, i } = props;

    return (
        <>
            {input.state[i].is_initialized || input.state[i].is_visible ? (
                <>
                    <c_color.FillShadow
                        is_visible={input.state[i].is_visible}
                        width={input.color_picker_width!}
                        height={input.color_picker_height!}
                    />
                    <c_tr.BaseTr
                        tag='span'
                        name='fade'
                        cls='color_picker_w'
                        state={input.state[i].is_visible}
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
                                input.color_picker_is_closed_none_cls!({
                                    i,
                                }),
                            ])}
                            onContextMenu={(e: any): void => {
                                e.stopPropagation(e);
                            }}
                            ref={color_picker_ref}
                        />
                    </c_tr.BaseTr>
                </>
            ) : undefined}
        </>
    );
});
