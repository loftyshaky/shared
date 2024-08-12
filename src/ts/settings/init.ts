import { d_settings } from 'settings/internal';
import { d_inputs } from 'inputs/internal';
import { d_offers } from 'shared/internal';

export const init_settings = (): void =>
    err(() => {
        d_inputs.InputWidth.set_min_and_max_width();
        d_settings.Sections.init_options();

        d_offers.Offers.set_offers();
    }, 'shr_1087');
