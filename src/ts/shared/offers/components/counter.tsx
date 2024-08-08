import React from 'react';
import { observer } from 'mobx-react';

import { d_offers } from 'shared/internal';

export const Counter: React.FunctionComponent = observer(() => (
    <span className='counter'>{`${d_offers.Offers.current_offer_no}/${d_offers.Offers.offers_of_type.length}`}</span>
));
