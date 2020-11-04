import React from 'react';
import { observer } from 'mobx-react';

import { BaseTr } from 'shared/internal';
import {
    o_inputs,
    i_inputs,
} from 'inputs/internal';

interface Props {
    section_or_input: o_inputs.Section | i_inputs.Input;
}
@observer
export class Help extends React.Component<Props> {
    public render(): JSX.Element {
        const { section_or_input } = this.props;

        return (
            <BaseTr
                tag='p'
                name='fade'
                cls='help'
                state={section_or_input.help_is_visible as boolean}
            >
                {ext.msg(`${section_or_input.name}_help_text`)}
            </BaseTr>
        );
    }
}
