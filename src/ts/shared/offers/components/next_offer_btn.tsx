import { observer } from 'mobx-react-lite';

import { c_inputs, o_inputs } from 'inputs/internal';
import { d_offers, svg } from 'shared/internal';

export const NextOfferBtn: React.FunctionComponent = observer(() => (
    <c_inputs.IconBtn
        input={
            new o_inputs.IconBtn({
                name: 'next_offer',
                Svg: svg.NavigateNext,
                event_callback: d_offers.Offers.show_next_offer,
            })
        }
    />
));
