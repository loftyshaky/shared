import { i_error } from 'error_modules/internal';

export interface ErrorObj extends Error, i_error.Error {
    name: string;
    error_code?: string;
    error_msg?: string;
}
