import React from 'react';
import { observer } from 'mobx-react';

import { c_offers, d_offers } from 'shared/internal';

export const TopBar: React.FunctionComponent = observer(() =>
    d_offers.Main.i().offers_of_type.length > 1 ? (
        <div className='top_bar'>
            <c_offers.AdLabel />

            <span className='visible'>
                <c_offers.Counter />
                <c_offers.PreviousOfferBtn />
                <c_offers.NextOfferBtn />
            </span>
            <span className='shadow'>
                <c_offers.Counter />
                <c_offers.PreviousOfferBtn />
                <c_offers.NextOfferBtn />
            </span>
        </div>
    ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
    ),
);
