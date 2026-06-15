import { observer } from 'mobx-react-lite';
import { type TransitionEvent, useRef } from 'react';
import { useCallback, useEffect } from 'react';

import { d_tr, type i_tr, o_tr, type p_tr } from 'shared/internal';

const get_transitions = (): i_tr.Transitions => ({
    fade: new o_tr.Transition({
        unactive_cls: 'opacity_0',
        active_cls: 'opacity_1',
    }),
    fade_reverse: new o_tr.Transition({
        unactive_cls: 'opacity_0',
        active_cls: 'opacity_1',
    }),
    upload_box: new o_tr.Transition({
        unactive_cls: 'upload_box_idle',
        active_cls: 'upload_box_hover',
    }),
});

export const BaseTr = observer((props: p_tr.BaseTr) => {
    const is_first_render = useRef(true);
    const tr_el_ref = useRef<HTMLElement>(null);
    const {
        name,
        cls,
        state,
        attr,
        style,
        tr_end_unactive,
        tr_end_active,
        children,
        tag: Tag,
    } = props;
    const transitions = get_transitions();

    const component_did_mount_or_update = useCallback(
        (is_update: boolean) => {
            err(() => {
                const { name, state } = props;
                d_tr.Transition.handle_transition({
                    name,
                    state,
                    tr_el_ref,
                    called_from_component_did_update: is_update,
                });
            }, 'shr_1131');
        },
        [props],
    );

    useEffect(() => {
        if (is_first_render.current) {
            is_first_render.current = false;

            component_did_mount_or_update(false);
        } else {
            component_did_mount_or_update(true);
        }
    });

    const cls_final = x.cls([
        cls,
        d_tr.Transition.transit({
            transitions,
            name,
            state,
        }),
    ]);

    return (
        <Tag
            {...attr}
            className={cls_final}
            ref={tr_el_ref}
            style={style}
            onTransitionEnd={(e: TransitionEvent): void =>
                err(() => {
                    const tr_end_el_cls = (e.target as HTMLElement).className;

                    if (typeof tr_end_el_cls === 'string' && tr_end_el_cls.includes(cls)) {
                        d_tr.Transition.handle_transition(
                            {
                                name,
                                state,
                                tr_end_unactive,
                                tr_end_active,
                                tr_el_ref,
                                called_from_component_did_update: false,
                            },
                            e,
                        );
                    }
                }, 'shr_1132')
            }
        >
            {children}
        </Tag>
    );
});
