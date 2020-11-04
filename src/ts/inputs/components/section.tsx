import React from 'react';
import { observer } from 'mobx-react';

import {
    o_inputs,
    c_inputs,
} from 'inputs/internal';

interface Props {
    i: number;
    section: o_inputs.Section;
}

@observer
export class Section extends React.Component<Props> {
    public render(): JSX.Element {
        const {
            i,
            section,
        } = this.props;

        return (
            <div
                key={i}
                className={x.cls([
                    'section',
                    section.name,
                ])}
            >
                <div className='section_help'>
                    {
                        section.include_help
                            ? <c_inputs.HelpBtn section_or_input={section} />
                            : undefined
                    }
                    {
                        section.include_help
                            ? <c_inputs.Help section_or_input={section} />
                            : undefined
                    }
                </div>
                <c_inputs.SectionContent inputs={section.inputs} />
            </div>
        );
    }
}
