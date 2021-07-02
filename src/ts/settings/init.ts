import { d_settings } from 'settings/internal';

export const init_settings = (): void =>
    err(() => {
        d_settings.Sections.i().init_options();
    }, 'shr_1174');
