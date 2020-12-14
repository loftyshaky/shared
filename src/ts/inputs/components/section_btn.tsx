import React from 'react';
import { observer } from 'mobx-react';

import { t } from 'shared/internal';
import {
    o_inputs,
} from 'inputs/internal';
import { d_settings } from 'settings/internal';

interface Props {
    section: o_inputs.Section;
    change_section_callback: t.CallbackVoid;
}

export const SectionBtn = observer((props: Props) => {
    const {
        section,
        change_section_callback,
    } = props;

    return (
        <button
            className={x.cls([
                'section_btn',
                section.name,
                section.name === d_settings.Sections.i.current_section
                    ? 'selected'
                    : '',
            ])}
            type='button'
            onClick={() => d_settings.Sections.i.change(
                {
                    section_name: section.name,
                    callback: change_section_callback,
                },
            )}
        >
            {ext.msg(`${section.name}_section_text`)}
        </button>
    );
});
