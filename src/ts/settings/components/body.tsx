import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_app_version, c_offers, d_offers } from 'shared/internal';
import { c_inputs, o_inputs, d_color, s_color } from 'inputs/internal';
import { d_sections, p_settings } from 'settings/internal';

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
                d_sections.Sections.change({ section_name: initial_section });

                x.bind(document, 'mousedown', d_color.Visibility.hide_all);
                x.bind(self, 'resize', s_color.Position.set);
                x.bind(document, 'keydown', d_color.Visibility.hide_color_picker_or_palette_on_esc);
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
                    {d_offers.Offers.found_offers_for_current_locale() ? (
                        <c_offers.Body
                            is_visible={data.settings.prefs.offers_are_visible}
                            offer_banner_type='horizontal'
                        />
                    ) : undefined}
                    <div className='sections' onScroll={s_color.Position.set}>
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
