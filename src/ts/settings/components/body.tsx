import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_app_version, c_offers, d_offers } from 'shared/internal';
import { c_inputs, o_inputs, d_inputs, d_color, s_color } from 'inputs/internal';
import { d_settings, p_settings } from 'settings/internal';

export const Body: React.FunctionComponent<p_settings.Body> = observer((props) => {
    const {
        sections,
        initial_section,
        change_section_callback,
        enable_developer_mode_save_callback,
    } = props;

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
        <>
            <div className='main_2 settings'>
                <div className='section_btns'>
                    {Object.values(sections).map(
                        (section: o_inputs.Section, i: number): JSX.Element => (
                            <c_inputs.SectionBtn
                                key={i}
                                section={section}
                                change_section_callback={change_section_callback}
                                enable_developer_mode_save_callback={
                                    section.name === 'admin'
                                        ? enable_developer_mode_save_callback
                                        : undefined
                                }
                            />
                        ),
                    )}
                    <div className='filler' />
                </div>
                <div className='sections_and_offers'>
                    {d_offers.Main.i().found_offers_for_current_locale() ? (
                        <c_offers.Body is_visible={data.settings.offers_are_visible} />
                    ) : undefined}
                    <div className='sections' onScroll={s_color.Position.i().set}>
                        {Object.values(sections).map(
                            (section: o_inputs.Section, i: number): JSX.Element => (
                                <c_inputs.Section key={i} section={section} />
                            ),
                        )}
                    </div>
                </div>
            </div>
            <c_app_version.Body />
        </>
    );
});
