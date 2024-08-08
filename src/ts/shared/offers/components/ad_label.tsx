import React from 'react';
import { observer } from 'mobx-react';

import { d_offers } from 'shared/internal';

export const AdLabel: React.FunctionComponent = observer(() => {
    const has_ad_label = d_offers.Offers.get_ad_label_visibility_state();

    return has_ad_label ? (
        <span className='ad_label'>
            <div>Ad</div>
        </span>
    ) : undefined;
});
