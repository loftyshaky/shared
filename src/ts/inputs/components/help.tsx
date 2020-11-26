import React from 'react';
import { observer } from 'mobx-react';

import { BaseTr } from 'shared/internal';
import {
    o_inputs,
    i_inputs,
} from 'inputs/internal';
import {
    u_settings,
} from 'settings/internal';

interface Props {
    section_or_input: o_inputs.Section | i_inputs.Input;
}
@observer
export class Help extends React.Component<Props> {
    public render(): JSX.Element {
        const { section_or_input } = this.props;
        const section_name: string | undefined = (section_or_input as i_inputs.Input).section;
        const is_input: boolean = n(section_name);

        return (
            <BaseTr
                tag='p'
                name='fade'
                cls='help'
                state={section_or_input.help_is_visible as boolean}
                style={{
                    width: is_input
                        ? u_settings.InputsWidth.i.width[section_name!]
                        : '',
                }}
            >
                {ext.msg(`${section_or_input.name}_help_text`)}
            </BaseTr>
        );
    }
}
