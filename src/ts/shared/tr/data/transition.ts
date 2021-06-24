import React from 'react';
import { action } from 'mobx';

import { t, o_tr } from 'shared/internal';

export class Transition {
    private static i0: Transition;

    public static i(): Transition {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    //> hide component when it faded out or show component when it starting fading in
    public handle_transition = action(
        (
            {
                name,
                state,
                tr_end_unactive,
                tr_end_active,
                tr_el_ref,
                called_from_component_did_update,
            }: {
                name: string;
                state: boolean;
                tr_end_unactive?: t.CallbackVariadicVoid[];
                tr_end_active?: t.CallbackVariadicVoid[];
                tr_el_ref: React.RefObject<HTMLElement>;
                called_from_component_did_update: boolean;
            },
            e?: React.TransitionEvent,
        ): void => {
            l(676666);
            const component_uses_fading_transition = name.includes('fade');

            if (component_uses_fading_transition) {
                if (n(tr_el_ref.current)) {
                    if (!called_from_component_did_update && !state) {
                        x.add_cls(tr_el_ref.current, 'hidden');
                    } else if (state) {
                        x.remove_cls(tr_el_ref.current, 'hidden');
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

    //> choose component mode (shown or hidden)
    public transit = ({
        transitions,
        name,
        state,
    }: {
        transitions: { [index: string]: o_tr.Transition };
        name: string;
        state: boolean;
    }): string => (state ? transitions[name].active_cls : transitions[name].unactive_cls);
    //< choose component mode (shown or hidden)

    public run_tr_end_callbacks = (
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
}
