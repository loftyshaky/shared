import { observer } from 'mobx-react-lite';

import { c_inputs, o_inputs } from 'inputs/internal';
import { d_offers, svg } from 'shared/internal';

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
