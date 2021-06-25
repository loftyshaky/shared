export const prevent_default = (e: any): void =>
    err(() => {
        e.preventDefault();
    }, 'shr_1125');
