import { SyntheticEvent } from 'react';

export const prevent_default = (e: SyntheticEvent): void =>
    err(() => {
        e.preventDefault();
    }, 'shr_1111');

export const stop_propagation = (e: SyntheticEvent): void =>
    err(() => {
        e.stopPropagation();
    }, 'shr_1218');
