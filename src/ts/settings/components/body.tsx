import React from 'react';
import { observer } from 'mobx-react';

import { t } from 'shared/internal';
import {
    o_inputs,
    c_inputs,
} from 'inputs/internal';
import { u_settings } from 'settings/internal';

interface Props {
    sections: { [index: string]: o_inputs.Section };
    initial_section: string;
    change_section_callback: t.CallbackVoid;
}

@observer
export class Body extends React.Component<Props> {
    public componentDidMount(): void {
        const { initial_section } = this.props;

        u_settings.Sections.i.change({ section_name: initial_section });

        window.addEventListener(
            'resize',
            u_settings.InputsWidth.i.set_max_width,
        );
    }

    public componentWillUnmount(): void {
        window.removeEventListener(
            'resize',
            u_settings.InputsWidth.i.set_max_width,
        );
    }

    public render(): JSX.Element {
        const {
            sections,
            change_section_callback,
        } = this.props;

        return (
            <div className='main'>
                <div className='main_2'>
                    <div className='section_btns'>
                        {
                            Object.values(sections).map((
                                section: o_inputs.Section,
                                i: number,
                            ): JSX.Element => (
                                <c_inputs.SectionBtn
                                    key={i}
                                    section={section}
                                    change_section_callback={change_section_callback}
                                />
                            ))
                        }
                        <div className='filler' />
                    </div>
                    <div
                        className='sections'
                    >
                        {
                            Object.values(sections).map((
                                section: o_inputs.Section,
                                i: number,
                            ): JSX.Element => (
                                <c_inputs.Section
                                    key={i}
                                    section={section}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
