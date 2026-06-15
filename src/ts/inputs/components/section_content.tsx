import type { JSX } from 'react';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Fragment } from 'react';

import { c_inputs, type i_inputs, o_inputs, type p_inputs, s_inputs } from 'inputs/internal';
import { c_offers, c_tr } from 'shared/internal';

export const SectionContent: React.FunctionComponent<p_inputs.SectionContent> = observer(
    (props) => {
        const { section, inputs } = props;

        useEffect(() => {
            if (n(section) && n(section.set_content_is_visible)) {
                void section.set_content_is_visible();
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

        const Offers = (): JSX.Element =>
            n(section) && section.include_offers ? (
                <c_offers.Body is_visible offer_banner_type={section.offer_banner_type} />
            ) : (
                <></>
            );

        const InputsAndOffers = (): JSX.Element =>
            inputs.length === 0 ? (
                <Offers />
            ) : (
                <>
                    <div className='inputs'>
                        {Object.values(inputs).map(
                            (input: i_inputs.Input | o_inputs.Link): JSX.Element => (
                                <Fragment key={input.id}>{s_inputs.resolve({ input })}</Fragment>
                            ),
                        )}
                    </div>
                    <Offers />
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
                    <InputsAndOffers />
                </c_tr.BaseTr>
            </>
        ) : (
            <InputsAndOffers />
        );
    },
);
