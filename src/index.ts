import {
    c_error,
    c_crash_handler,
} from 'modules/internal';

export {
    X,
    Ext,
    t,
    BaseTr,
    Transition,
} from 'shared/internal';

export const { Body: CrashHandler } = c_crash_handler;
export const { Body: Error } = c_error;
