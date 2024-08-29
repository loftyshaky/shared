import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
    useFloating,
    useInteractions,
    useClick,
    offset,
    flip,
    shift,
    autoUpdate,
    useDismiss,
} from '@floating-ui/react';

import { stop_propagation } from 'shared_clean/internal';
import { c_tr } from 'shared/internal';
import { o_inputs, p_inputs, i_inputs } from 'inputs/internal';

export const LinkIconBtn: React.FunctionComponent<p_inputs.LinkIconBtn> = observer((props) => {
    const { input, type } = props;
    const [open, set_open] = useState(false);
    const {
        x: xx,
        y,
        refs,
        context,
        strategy,
    } = useFloating({
        open,
        middleware: [flip(), shift({ padding: 10 }), offset(10)],
        onOpenChange: set_open,
        whileElementsMounted: autoUpdate,
    });
    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context, {
            escapeKey: true,
            outsidePress: true,
        }),
    ]);

    return (
        <>
            <c_tr.BaseTr
                tag='button'
                name='fade'
                cls={x.cls(['btn', `${type}_btn`, input.is_enabled_cls!(), input.name])}
                attr={{
                    type: 'button',
                    title:
                        input instanceof o_inputs.IconBtn
                            ? input.alt_msg || ext.msg(`${input.name}_btn_title`)
                            : '',
                    tabIndex: input.tab_index!(),
                    onClick: input.event_callback,
                    onKeyDown: stop_propagation,
                }}
                state={
                    input.is_visible_computed!() &&
                    ((input.is_cut && data.settings.prefs.enable_cut_features) || !input.is_cut)
                }
                style={{ marginLeft: x.px(input.offset) }}
            >
                {input instanceof o_inputs.IconBtn ? (
                    <input.Svg />
                ) : (
                    <span>{input.alt_msg || ext.msg(`${input.name}_link_btn_text`)}</span>
                )}
                {n(input.btn_options) && (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <span className='shadow' ref={refs.setReference} {...getReferenceProps()} />
                )}
            </c_tr.BaseTr>
            {n(input.btn_options) && (
                // eslint-disable-next-line react/jsx-no-useless-fragment, jsx-a11y/no-static-element-interactions
                <div
                    className='btn_options_w'
                    ref={refs.setFloating}
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: xx ?? 0,
                    }}
                    onClick={(): void => {
                        set_open(false);
                    }}
                    onKeyDown={() => undefined}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...getFloatingProps()}
                >
                    <c_tr.BaseTr tag='div' name='fade' cls='btn_options' state={open}>
                        {input.btn_options.map(
                            (btn_option: i_inputs.BtnOption, i: number): JSX.Element => {
                                const msg =
                                    btn_option.alt_msg ||
                                    ext.msg(`${btn_option.name}_btn_option_text`) ||
                                    btn_option.name;

                                return (
                                    <>
                                        {i !== 0 && <hr />}
                                        {btn_option.type === 'link' ? (
                                            <a
                                                className='btn_option'
                                                href={btn_option.href}
                                                key={i}
                                            >
                                                {msg}
                                            </a>
                                        ) : (
                                            <button
                                                className='btn_option'
                                                type='button'
                                                key={i}
                                                onClick={() =>
                                                    btn_option.event_callback({ btn_option })
                                                }
                                            >
                                                {msg}
                                            </button>
                                        )}
                                    </>
                                );
                            },
                        )}
                    </c_tr.BaseTr>
                </div>
            )}
        </>
    );
});
