import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, o_inputs } from 'inputs/internal';
import { svg, d_offers } from 'shared/internal';

export const NextOfferBtn: React.FunctionComponent<any> = observer(() => (
    <c_inputs.IconBtn
        input={
            new o_inputs.IconBtn({
                name: 'next_offer',
                Svg: svg.NavigateNext,
                event_callback: d_offers.Main.i().show_next_offer,
            })
        }
    />
));
