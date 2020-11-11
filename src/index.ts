import {
    c_error,
    c_crash_handler,
} from 'error_modules/internal';

export {
    X,
    Ext,
    t,
    vars,
    CssVars,
    Utils,
    BaseTr,
    Transition,
} from 'shared/internal';

export const { Body: CrashHandler } = c_crash_handler;
export const { Body: Error } = c_error;
