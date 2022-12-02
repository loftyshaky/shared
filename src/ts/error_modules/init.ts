import { d_error } from 'error_modules/internal';

export const init_error = (): void => {
    d_error.Progress.i().update_progress_autorun();
};
