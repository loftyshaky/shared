import { SyntheticEvent } from 'react';

export const prevent_default = (e: SyntheticEvent): void =>
    err(() => {
        e.preventDefault();
    }, 'shr_1111');
