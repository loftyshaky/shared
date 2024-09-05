import { i_error } from 'error_modules_clean/internal';

export interface ShowErrorState1 {
    error_msg_key: string;
    alt_msg: string;
    notification_type: i_error.NotificationType;
    hide_delay: number;
    is_fullscreen: boolean;
    error_ui_is_visible: boolean;
    persistent_final: boolean;
    prevent_subsequent_errors?: boolean;
}
