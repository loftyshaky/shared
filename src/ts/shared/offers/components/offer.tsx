import React from 'react';
import { observer } from 'mobx-react';

import { d_offers } from 'shared/internal';

export const Offer: React.FunctionComponent = observer(() => (
    <div className='offer'>
        <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: d_offers.Main.i().current_offer_text }}
        />
        {n(d_offers.Main.i().current_offer_banner) ? (
            <a href={d_offers.Main.i().current_offer_banner_link} target='_blank' rel='noreferrer'>
                <img
                    src={d_offers.Main.i().current_offer_banner}
                    alt='Offer banner'
                    draggable='false'
                />
            </a>
        ) : undefined}
    </div>
));
