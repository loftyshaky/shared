import React from 'react';
import { observer } from 'mobx-react';

import { t } from 'shared/internal';
import {
    o_inputs,
} from 'inputs/internal';
import { u_settings } from 'settings/internal';

interface Props {
    section: o_inputs.Section;
    change_section_callback: t.CallbackVoid;
}

@observer
export class SectionBtn extends React.Component<Props> {
    public render(): JSX.Element {
        const {
            section,
            change_section_callback,
        } = this.props;

        return (
            <button
                className={x.cls([
                    'section_btn',
                    section.name,
                    section.name === u_settings.Sections.i.current_section
                        ? 'selected'
                        : '',
                ])}
                type='button'
                onClick={() => u_settings.Sections.i.change(
                    {
                        section_name: section.name,
                        callback: change_section_callback,
                    },
                )}
            >
                {ext.msg(`${section.name}_section_text`)}
            </button>
        );
    }
}
