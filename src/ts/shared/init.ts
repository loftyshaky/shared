import { init_settings } from 'settings/internal';

export const init_shared = (): void =>
    err(() => {
        init_settings();
    }, 'shr_1175');
