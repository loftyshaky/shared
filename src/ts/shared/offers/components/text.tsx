import React from 'react';
import { observer } from 'mobx-react';

import { d_offers } from 'shared/internal';

export const Text: React.FunctionComponent<any> = observer(() => (
    <div
        className='offer'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: d_offers.Main.i().current_offer_text }}
    />
));
