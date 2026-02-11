import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, p_inputs } from 'inputs/internal';

export const Section: React.FunctionComponent<p_inputs.Section> = observer((props) => {
    const { section } = props;

    return (
        <div className={x.cls(['section', section.name, section.visibility_cls!({ section })])}>
            {section.available ? (
                <>
                    <div className='section_help'>
                        {section.include_help ? (
                            <c_inputs.HelpBtn section_or_input={section} />
                        ) : undefined}
                        {section.include_help ? (
                            <c_inputs.Help section_or_input={section} />
                        ) : undefined}
                    </div>
                    <c_inputs.SectionContent section={section} inputs={section.inputs} />
                </>
            ) : (
                <div>
                    {(globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                        `${section.unavailable_msg}_section_unavailable_msg_text`,
                    ) || section.unavailable_msg}
                </div>
            )}
        </div>
    );
});
