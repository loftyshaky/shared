import React from 'react';
import { observer } from 'mobx-react';

import {
    i_inputs,
    c_inputs,
} from 'inputs/internal';

interface Props {
    input: i_inputs.Input;
    input_w: JSX.Element;
    include_label: boolean;
}

@observer
export class InputItem extends React.Component<Props> {
    public render(): JSX.Element {
        const { input, input_w, include_label } = this.props;

        return (
            <div
                className={x.cls([
                    'input_item',
                    input.type,
                    input.name,
                    n(input.parent)
                        ? 'child'
                        : '',
                ])}
            >
                {include_label
                    ? <c_inputs.Label input={input} />
                    : undefined}
                {input_w}
            </div>
        );
    }
}
