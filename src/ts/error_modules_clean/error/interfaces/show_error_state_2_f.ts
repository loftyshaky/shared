import { i_error } from 'error_modules_clean/internal';

export type ShowErrorState2F = (
    error_obj: i_error.ErrorObj | undefined,
    error_code: string | undefined,
    { error_msg_key, error_ui_is_visible, silent_final }: i_error.ShowErrorState2,
) => void;
