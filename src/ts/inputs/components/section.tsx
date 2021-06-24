import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, p_inputs } from 'inputs/internal';
import { d_settings } from 'settings/internal';

export const Section: React.FunctionComponent<p_inputs.Section> = observer((props) => {
    const { section } = props;

    return (
        <div
            className={x.cls([
                'section',
                section.name,
                section.name === d_settings.Sections.i().current_section ? '' : 'hidden',
            ])}
        >
            <div className='section_help'>
                {section.include_help ? <c_inputs.HelpBtn section_or_input={section} /> : undefined}
                {section.include_help ? <c_inputs.Help section_or_input={section} /> : undefined}
            </div>
            <c_inputs.SectionContent inputs={section.inputs} />
        </div>
    );
});
