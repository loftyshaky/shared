// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { t } from 'shared/internal';

export class Transition {
    public unactive_cls: string;
    public active_cls: string;

    public constructor(obj: { unactive_cls: string; active_cls: string }) {
        this.unactive_cls = obj.unactive_cls;
        this.active_cls = obj.active_cls;
    }
}

interface Props {
    name: string; // effect name ex: fade
    tag: any;
    cls: string;
    state: boolean;
    attr?: { [index: string]: string };
    style?: { [index: string]: string | number | undefined };
    tr_end_unactive?: t.CallbackVariadicVoid[];
    tr_end_active?: t.CallbackVariadicVoid[];
}

export class BaseTr extends React.Component<Props> {
    private tr_el_ref = React.createRef<HTMLElement>();

    public transitions: { [index: string]: Transition } = {
        fade: new Transition({
            unactive_cls: 'opacity_0',
            active_cls: 'opacity_1',
        }),
        fade_reverse: new Transition({
            unactive_cls: 'opacity_0',
            active_cls: 'opacity_1',
        }),
    };

    //> hide component when it faded out or show component when it starting fading in
    private handle_transition = action(
        (
            {
                called_from_component_did_update,
                tr_end_unactive,
                tr_end_active,
            }: {
                called_from_component_did_update: boolean;
                tr_end_unactive?: t.CallbackVariadicVoid[];
                tr_end_active?: t.CallbackVariadicVoid[];
            },
            e?: React.TransitionEvent,
        ): void => {
            const { name, state } = this.props;

            const component_uses_fading_transition = name.includes('fade');

            if (component_uses_fading_transition) {
                if (n(this.tr_el_ref.current)) {
                    if (!called_from_component_did_update && !state) {
                        x.add_cls(this.tr_el_ref.current, 'hidden');
                    } else if (state) {
                        x.remove_cls(this.tr_el_ref.current, 'hidden');
                    }
                }
            }
            if (n(e)) {
                if (n(tr_end_active) && state) {
                    this.run_tr_end_callbacks({ tr_end_callbacks: tr_end_active }, e);
                } else if (n(tr_end_unactive) && !state) {
                    this.run_tr_end_callbacks({ tr_end_callbacks: tr_end_unactive }, e);
                }
            }
        },
    );
    //< hide component when it faded out or show component when it starting fading in

    public componentDidMount(): void {
        this.handle_transition({ called_from_component_did_update: false });
    }

    public componentDidUpdate(): void {
        this.handle_transition({ called_from_component_did_update: true });
    }

    //> choose component mode (shown or hidden)
    private transit = ({ name, state }: { name: string; state: boolean }): string =>
        state ? this.transitions[name].active_cls : this.transitions[name].unactive_cls;
    //< choose component mode (shown or hidden)

    private run_tr_end_callbacks = (
        {
            tr_end_callbacks,
        }: {
            tr_end_callbacks: t.CallbackVariadicVoid[];
        },
        e: React.TransitionEvent,
    ): void => {
        tr_end_callbacks.forEach((callback): void => {
            callback(e);
        });
    };

    public render(): JSX.Element {
        const { name, cls, state, attr, style, tr_end_unactive, tr_end_active, children } =
            this.props;

        const cls_final = x.cls([
            cls,
            this.transit({
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
                        this.handle_transition(
                            {
                                called_from_component_did_update: false,
                                tr_end_unactive,
                                tr_end_active,
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
