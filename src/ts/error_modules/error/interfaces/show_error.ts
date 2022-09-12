import { i_error } from 'error_modules/internal';

export interface ShowError extends i_error.Error {
    error_msg_key?: string;
    notification_type?: i_error.NotificationType;
    hide_delay?: number;
    silent?: boolean;
    persistent?: boolean;
    exit?: boolean;
}
