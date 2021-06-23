import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_ext_version } from 'shared/internal';
import { o_inputs, d_color, s_color, c_inputs } from 'inputs/internal';
import { d_settings, u_settings, p_settings } from 'settings/internal';

export const Body = observer((props: p_settings.Body) => {
    const { sections, initial_section, change_section_callback } = props;

    useEffect(() => {
        d_settings.Sections.i().change({ section_name: initial_section });

        window.addEventListener('resize', u_settings.InputsWidth.i().set_max_width);
        window.addEventListener('mousemove', u_settings.InputsWidth.i().set_max_width);
        document.addEventListener('mousedown', d_color.Visibility.i().hide_all);
        window.addEventListener('resize', s_color.Position.i().set);
        document.addEventListener(
            'keydown',
            d_color.Visibility.i().hide_color_picker_or_palette_on_esc,
        );

        return () => {
            window.removeEventListener('resize', u_settings.InputsWidth.i().set_max_width);
            window.removeEventListener('mousemove', u_settings.InputsWidth.i().set_max_width);
            document.removeEventListener('mousedown', d_color.Visibility.i().hide_all);
            window.removeEventListener('resize', s_color.Position.i().set);
            document.removeEventListener(
                'keydown',
                d_color.Visibility.i().hide_color_picker_or_palette_on_esc,
            );
        };
    }, [props, initial_section]);

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
                    <c_ext_version.Body />
                </div>
            </div>
        </div>
    );
});
