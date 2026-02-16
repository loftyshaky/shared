import React from 'react';
import { observer } from 'mobx-react';

import { d_inputs, p_inputs } from 'inputs/internal';
import { d_developer_mode, d_sections } from 'settings/internal';

export const SectionBtn: React.FunctionComponent<p_inputs.SectionBtn> = observer((props) => {
    const { section, change_section_callback, enable_developer_mode_save_callback } = props;

    return (
        <button
            className={x.cls([
                'section_btn',
                section.name,
                d_sections.Sections.selected_cls({ section_name: section.name }),
            ])}
            type='button'
            tabIndex={d_sections.Sections.tab_index({ section_name: section.name })}
            onClick={() => {
                d_sections.Sections.change({
                    section_name: section.name,
                    callback: change_section_callback,
                });

                if (n(enable_developer_mode_save_callback)) {
                    d_developer_mode.DeveloperMode.enable({
                        save_callback: enable_developer_mode_save_callback,
                    });
                }
            }}
        >
            {d_inputs.SectionBtn.msg!({ section })}
        </button>
    );
});
