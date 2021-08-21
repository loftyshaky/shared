import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_ext_version } from 'shared/internal';
import { c_inputs, o_inputs, d_inputs, d_color, s_color } from 'inputs/internal';
import { d_settings, p_settings } from 'settings/internal';

export const Body: React.FunctionComponent<p_settings.Body> = observer((props) => {
    const { sections, initial_section, change_section_callback } = props;

    useEffect(
        () =>
            err(() => {
                d_settings.Sections.i().change({ section_name: initial_section });

                x.bind(self, 'resize', d_inputs.InputWidth.i().set_max_width);
                x.bind(self, 'mousemove', d_inputs.InputWidth.i().set_max_width);
                x.bind(document, 'mousedown', d_color.Visibility.i().hide_all);
                x.bind(self, 'resize', s_color.Position.i().set);
                x.bind(
                    document,
                    'keydown',
                    d_color.Visibility.i().hide_color_picker_or_palette_on_esc,
                );
            }, 'shr_1074'),
        [props, initial_section],
    );

    return (
        <div className='main'>
            <div className='main_2'>
                <div className='section_btns'>
                    {Object.values(sections).map(
                        (section: o_inputs.Section, i: number): JSX.Element => (
                            <c_inputs.SectionBtn
                                key={i}
                                section={section}
                                change_section_callback={change_section_callback}
                            />
                        ),
                    )}
                    <div className='filler' />
                </div>
                <div className='sections' onScroll={s_color.Position.i().set}>
                    {Object.values(sections).map(
                        (section: o_inputs.Section, i: number): JSX.Element => (
                            <c_inputs.Section key={i} section={section} />
                        ),
                    )}
                </div>
            </div>
            <c_ext_version.Body />
        </div>
    );
});
