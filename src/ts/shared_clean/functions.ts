import type { UIEvent } from 'react';

import type { t } from 'shared_clean/internal';

export const prevent_default = (e: UIEvent): void =>
    err(() => {
        e.preventDefault();
    }, 'shr_1111');

export const stop_propagation = (e: UIEvent): void =>
    err(() => {
        e.stopPropagation();
    }, 'shr_1218');

export const run_in_action_placeholder = (callback: t.CallbackUndefined): void =>
    err(() => {
        callback();
    }, 'shr_1234');
