import React from 'react';
import { observer } from 'mobx-react';

import { c_offers, c_tr, d_offers, p_offers } from 'shared/internal';

export const Body: React.FunctionComponent<p_offers.Body> = observer((props) => {
    const { is_visible, offer_banner_type } = props;

    return n(d_offers.Offers.current_offer_text) ? (
        <c_tr.BaseTr tag='div' name='fade' cls='offers' state={is_visible}>
            <div className='offers_inner'>
                <c_offers.TopBar />
                <c_offers.Offer offer_banner_type={offer_banner_type} />
            </div>
        </c_tr.BaseTr>
    ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
    );
});
