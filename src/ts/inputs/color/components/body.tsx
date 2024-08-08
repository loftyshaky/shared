import React, { useEffect, useRef } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { c_tr } from 'shared/internal';
import { c_inputs, c_color, o_inputs, d_color, p_color } from 'inputs/internal';

export const Body: React.FunctionComponent<p_color.Body> = observer((props) => {
    const { input } = props;
    const palette_ref = useRef<HTMLDivElement>(null);

    useEffect(() =>
        err(() => {
            runInAction(() =>
                err(() => {
                    if (input.palette_is_visible && n(palette_ref.current)) {
                        input.palette_width = palette_ref.current.offsetWidth.toString();
                        input.palette_height = palette_ref.current.offsetHeight.toString();
                    }
                }, 'shr_1001'),
            );
        }, 'shr_1002'),
    );

    // eslint-disable-next-line no-unused-expressions
    input.palette_is_visible;
    // eslint-disable-next-line no-unused-expressions
    n(input.state) && input.state.main;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <div className={x.cls(['input_w', 'color', input.name])}>
                    <span className='inner_w'>
                        <c_color.FillShadow
                            is_visible={input.palette_is_visible || false}
                            width={x.px(input.palette_width)}
                            height={x.px(input.palette_height)}
                        />
                        <c_tr.BaseTr
                            tag='div'
                            name='fade'
                            cls='palette_w'
                            state={input.palette_w_is_visible!()}
                            tr_end_unactive={[
                                (): void => {
                                    d_color.Visibility.mark_palette_as_closed({
                                        input,
                                        is_closed: true,
                                    });
                                },
                            ]}
                        >
                            <div
                                className={x.cls([
                                    'palette',
                                    input.palette_is_closed_visibility_cls!(),
                                ])}
                                ref={palette_ref}
                            >
                                <c_tr.BaseTr
                                    tag='div'
                                    name='fade'
                                    cls={x.cls([
                                        'color_help_w',
                                        input.color_help_visibility_cls!(),
                                    ])}
                                    state={data.settings.color_help_is_visible}
                                    tr_end_unactive={[
                                        d_color.Visibility.hide_color_help_tr_end,
                                    ]}
                                >
                                    <p className='color_help'>{ext.msg('color_help_text')}</p>
                                    <c_inputs.LinkBtn
                                        input={
                                            new o_inputs.LinkBtn({
                                                name: 'hide',
                                                event_callback: (): void => {
                                                    d_color.Visibility.hide_color_help({
                                                        input,
                                                    });
                                                },
                                            })
                                        }
                                    />
                                </c_tr.BaseTr>
                                <div className='palette_link_btns'>
                                    {input.include_remove_color_btn ? (
                                        <c_inputs.LinkBtn
                                            input={
                                                new o_inputs.LinkBtn({
                                                    name: 'remove_color',
                                                    event_callback: (): void => {
                                                        d_color.Color.remove_color({ input });
                                                    },
                                                })
                                            }
                                        />
                                    ) : undefined}
                                    <c_inputs.LinkBtn
                                        input={
                                            new o_inputs.LinkBtn({
                                                name: 'restore_default_palette',
                                                event_callback: (): void => {
                                                    d_color.Color.restore_default_palette({
                                                        input,
                                                    });
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className='palette_colors'>
                                    {n(data.settings.colors)
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
                                        : undefined}
                                </div>
                                {input.include_ok_btn ? (
                                    <c_inputs.Btn
                                        input={
                                            new o_inputs.Btn({
                                                name: 'color_ok_btn',
                                                alt_msg: 'OK',
                                                event_callback: (): void =>
                                                    d_color.Color.save({
                                                        i: 'main',
                                                        input,
                                                        callback: (): void => {
                                                            input.event_callback({
                                                                input,
                                                                i: 'main',
                                                            });
                                                        },
                                                    }),
                                            })
                                        }
                                    />
                                ) : undefined}
                            </div>
                        </c_tr.BaseTr>
                    </span>
                    {input.include_visualization ? (
                        <c_color.Visualization input={input} i='main' aria_label='Choose color' />
                    ) : undefined}
                </div>
            </div>
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    );

    return (
        <c_inputs.InputItem
            input={input}
            input_w={input_w}
            include_label={rb(input.include_palette_label)}
        />
    );
});
