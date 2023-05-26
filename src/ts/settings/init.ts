import { d_settings } from 'settings/internal';
import { d_offers } from 'shared/internal';

export const init_settings = (): void =>
    err(() => {
        d_settings.Sections.i().init_options();

        d_offers.Main.i().choose_random_offer();
    }, 'shr_1087');
