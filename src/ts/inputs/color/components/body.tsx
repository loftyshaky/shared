import React, {
    useEffect,
    useRef,
} from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { BaseTr } from 'shared/internal';
import {
    c_inputs,
    d_color,
    p_color,
    c_color,
} from 'inputs/internal';

export const Body = observer((props: p_color.Body) => {
    const { input } = props;
    const palette_ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        runInAction(() => {
            if (
                input.palette_is_visible
                && n(palette_ref.current)
            ) {
                input.palette_width = palette_ref.current.offsetWidth;
                input.palette_height = palette_ref.current.offsetHeight;
            }
        });
    });

    // eslint-disable-next-line no-unused-expressions
    input.palette_is_visible; input.state.main;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <div
                    className={x.cls([
                        'input_w',
                        'color',
                        input.name,
                    ])}
                >
                    <c_color.FillShadow
                        is_visible={input.palette_is_visible || false}
                        width={input.palette_width!}
                        height={input.palette_height!}
                    />
                    <BaseTr
                        tag='div'
                        name='fade'
                        cls='palette_w'
                        state={input.palette_w_is_visible!()}
                    >
                        <div
                            className='palette'
                            ref={palette_ref}
                        >

                            <BaseTr
                                tag='div'
                                name='fade'
                                cls='color_help_w'
                                state={data.settings.show_color_help}
                            >
                                <p className='color_help'>
                                    {ext.msg('color_help_text')}
                                </p>
                                <c_inputs.LinkBtn
                                    name='hide'
                                    on_click={(): void => {
                                        d_color.Visibility.i().hide_color_help({ input });
                                    }}
                                />
                            </BaseTr>
                            <div className='palette_colors'>
                                {
                                    n(data.settings.colors)
                                        ? data.settings.colors.map(
                                            (color: string, i: number): JSX.Element => (
                                                <c_color.Visualization
                                                    key={i}
                                                    input={input}
                                                    i={i}
                                                    aria_label='Open color picker'
                                                />
                                            ),
                                        )
                                        : undefined
                                }
                            </div>
                        </div>
                    </BaseTr>
                    {
                        input.include_visualization
                            ? (
                                <c_color.Visualization
                                    input={input}
                                    i='main'
                                    aria_label='Choose color'
                                />
                            )
                            : undefined
                    }
                </div>
            </div>
            {input.include_help
                ? <c_inputs.Help section_or_input={input} />
                : undefined}
        </>
    );

    return (
        <c_inputs.InputItem
            input={input}
            input_w={input_w}
            include_label={input.include_palette_label!}
        />
    );
});
