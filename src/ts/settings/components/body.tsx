import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import {
    o_inputs,
    c_inputs,
} from 'inputs/internal';
import {
    d_settings,
    u_settings,
    p_settings,
} from 'settings/internal';

export const Body = observer((props: p_settings.Body) => {
    const {
        sections,
        initial_section,
        change_section_callback,
    } = props;

    useEffect(() => {
        d_settings.Sections.i.change({ section_name: initial_section });

        window.addEventListener(
            'resize',
            u_settings.InputsWidth.i.set_max_width,
        );
        window.addEventListener(
            'mousemove',
            u_settings.InputsWidth.i.set_max_width,
        );
    },
    [
        props,
        initial_section,
    ]);

    useEffect(() => (
        () => {
            window.removeEventListener(
                'resize',
                u_settings.InputsWidth.i.set_max_width,
            );
            window.removeEventListener(
                'mousemove',
                u_settings.InputsWidth.i.set_max_width,
            );
        }
    ));

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
});
