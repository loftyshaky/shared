import React from 'react';
import { observer } from 'mobx-react';

import { d_offers, p_offers } from 'shared/internal';

export const Offer: React.FunctionComponent<p_offers.Offer> = observer((props) => {
    const { offer_banner_type } = props;
    const current_offer_banner = d_offers.Main.i().get_current_offer_banner({
        offer_banner_type,
    });

    return (
        <div className='offer'>
            <p
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: d_offers.Main.i().current_offer_text }}
            />
            {n(current_offer_banner) ? (
                <a
                    href={d_offers.Main.i().current_offer_banner_link}
                    target='_blank'
                    rel='noreferrer'
                >
                    <img src={current_offer_banner} alt='Offer banner' draggable='false' />
                </a>
            ) : undefined}
        </div>
    );
});
