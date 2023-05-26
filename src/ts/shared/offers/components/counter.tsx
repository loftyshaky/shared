import React from 'react';
import { observer } from 'mobx-react';

import { d_offers } from 'shared/internal';

export const Counter: React.FunctionComponent<any> = observer(() => (
    <span className='counter'>{`${d_offers.Main.i().current_offer_no}/${
        d_offers.Main.i().offers_of_type.length
    }`}</span>
));
