import { i_error } from 'error_modules_clean/internal';

export type ShowErrorState1F = (
    error_obj: i_error.ErrorObj | undefined,
    {
        error_msg_key,
        notification_type,
        hide_delay,
        is_fullscreen,
        error_ui_is_visible,
        persistent_final,
        prevent_subsequent_errors,
    }: i_error.ShowErrorState1,
) => void;
