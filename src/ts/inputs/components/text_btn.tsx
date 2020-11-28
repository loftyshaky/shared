import React from 'react';
import { configure } from 'mobx';

import {
    t,
    svg,
} from 'shared/internal';

import {
    o_inputs,
    d_inputs,
} from 'inputs/internal';

configure({ enforceActions: 'observed' });

interface Props {
    name: string;
    svg_name: string;
    input: o_inputs.Text;
    on_click?: t.CallbackAny;
}

export class TextBtn extends React.Component<Props> {
    public render(): JSX.Element {
        const { input } = this.props;

        const {
            name,
            svg_name,
            on_click,
        } = this.props;
        const Svg = svg[svg_name];

        return (
            <>
                <button
                    className={x.cls([
                        'btn',
                        'text',
                        input.remove_val_btn_visibility!(),
                        d_inputs.Val.i.warn_state({ input }),
                    ])}
                    type='button'
                    title={ext.msg(`${name}_text_input_btn_title`)}
                    onClick={on_click}
                >
                    <Svg />
                </button>
            </>
        );
    }
}
