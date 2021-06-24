// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { observer } from 'mobx-react';

import { o_tr, d_tr, p_tr } from 'shared/internal';

// need to be class to be able to be extended in apps
export class BaseTr extends React.Component<p_tr.BaseTr> {
    private tr_el_ref = React.createRef<HTMLElement>();

    public transitions: { [index: string]: o_tr.Transition } = {
        fade: new o_tr.Transition({
            unactive_cls: 'opacity_0',
            active_cls: 'opacity_1',
        }),
        fade_reverse: new o_tr.Transition({
            unactive_cls: 'opacity_0',
            active_cls: 'opacity_1',
        }),
    };

    public componentDidMount(): void {
        const { name, state } = this.props;

        d_tr.Transition.i().handle_transition({
            name,
            state,
            tr_el_ref: this.tr_el_ref,
            called_from_component_did_update: false,
        });
    }

    public componentDidUpdate(): void {
        const { name, state } = this.props;

        d_tr.Transition.i().handle_transition({
            name,
            state,
            tr_el_ref: this.tr_el_ref,
            called_from_component_did_update: true,
        });
    }

    public render(): JSX.Element {
        const { name, cls, state, attr, style, tr_end_unactive, tr_end_active, children } =
            this.props;

        const cls_final = x.cls([
            cls,
            d_tr.Transition.i().transit({
                transitions: this.transitions,
                name,
                state,
            }),
        ]);

        return (
            <this.props.tag
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...attr}
                className={cls_final}
                ref={this.tr_el_ref}
                style={style}
                onTransitionEnd={(e: any): void => {
                    const tr_end_el_cls = e.target.className;

                    if (typeof tr_end_el_cls === 'string' && tr_end_el_cls.includes(cls)) {
                        d_tr.Transition.i().handle_transition(
                            {
                                name,
                                state,
                                tr_end_unactive,
                                tr_end_active,
                                tr_el_ref: this.tr_el_ref,
                                called_from_component_did_update: false,
                            },
                            e,
                        );
                    }
                }}
            >
                {children}
            </this.props.tag>
        );
    }
}

observer(BaseTr);