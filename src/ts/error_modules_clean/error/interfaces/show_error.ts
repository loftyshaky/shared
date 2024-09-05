import { i_error } from 'error_modules_clean/internal';

export interface ShowError extends i_error.Error {
    error_msg_key?: string;
    alt_msg?: string;
    notification_type?: i_error.NotificationType;
    hide_delay?: number;
    silent?: boolean;
    persistent?: boolean;
    exit?: boolean;
    is_fullscreen?: boolean;
    prevent_subsequent_errors?: boolean;
    show_error_state_1?: i_error.ShowErrorState1F;
    show_error_state_2?: i_error.ShowErrorState2F;
}
