import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, o_inputs } from 'inputs/internal';
import { svg, d_offers } from 'shared/internal';

export const PreviousOfferBtn: React.FunctionComponent = observer(() => (
    <c_inputs.IconBtn
        input={
            new o_inputs.IconBtn({
                name: 'previous_offer',
                Svg: svg.NavigateBefore,
                event_callback: d_offers.Offers.show_previous_offer,
            })
        }
    />
));
