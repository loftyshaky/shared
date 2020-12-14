import React from 'react';
import { observer } from 'mobx-react';

import {
    o_inputs,
    c_inputs,
} from 'inputs/internal';
import { d_settings } from 'settings/internal';

interface Props {
    section: o_inputs.Section;
}

export const Section = observer((props: Props) => {
    const { section } = props;

    return (
        <div
            className={x.cls([
                'section',
                section.name,
                section.name === d_settings.Sections.i.current_section
                    ? ''
                    : 'hidden',
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
});
