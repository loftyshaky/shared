import { d_sections } from 'settings/internal';
import { d_offers } from 'shared/internal';

export const init_settings = (): void =>
    err(() => {
        d_sections.Sections.init_options();

        d_offers.Offers.set_offers();
    }, 'shr_1087');
