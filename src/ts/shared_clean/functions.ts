import { t } from 'shared_clean/internal';

export const prevent_default = (e: any): void =>
    err(() => {
        e.preventDefault();
    }, 'shr_1111');

export const stop_propagation = (e: any): void =>
    err(() => {
        e.stopPropagation();
    }, 'shr_1218');

export const run_in_action_placeholder = (callback: t.CallbackUndefined): void =>
    err(() => {
        callback();
    }, 'shr_1234');
