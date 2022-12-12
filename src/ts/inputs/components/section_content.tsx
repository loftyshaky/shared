import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_tr } from 'shared/internal';
import { c_inputs, s_inputs, o_inputs, p_inputs, i_inputs } from 'inputs/internal';

export const SectionContent: React.FunctionComponent<p_inputs.SectionContent> = observer(
    (props) => {
        const { section, inputs } = props;

        useEffect(() => {
            if (n(section) && n(section.set_content_is_visible)) {
                section.set_content_is_visible();
            }
        }, [section]);

        const LinkBtns = (): JSX.Element => (
            <>
                {n(section) && section.show_content_link_btn_is_visible!() ? (
                    <c_inputs.LinkBtn
                        input={
                            new o_inputs.LinkBtn({
                                name: 'show_content',
                                event_callback: section.change_visibility_of_content!,
                            })
                        }
                    />
                ) : undefined}
                {n(section) && section.hide_content_link_btn_is_visible!() ? (
                    <c_inputs.LinkBtn
                        input={
                            new o_inputs.LinkBtn({
                                name: 'hide_content',
                                event_callback: section.change_visibility_of_content!,
                            })
                        }
                    />
                ) : undefined}
            </>
        );

        const Inputs = (): JSX.Element => (
            <>
                {Object.values(inputs).map(
                    (input: i_inputs.Input | o_inputs.Link, i: number): JSX.Element => (
                        <React.Fragment key={i}>{s_inputs.resolve({ input })}</React.Fragment>
                    ),
                )}
            </>
        );

        return n(section) && section.content_is_hideable ? (
            <>
                <LinkBtns />
                <c_tr.BaseTr
                    tag='div'
                    name='fade'
                    cls='section_inner'
                    state={n(section.content_is_visible) && section.content_is_visible}
                >
                    <Inputs />
                </c_tr.BaseTr>
            </>
        ) : (
            <Inputs />
        );
    },
);
