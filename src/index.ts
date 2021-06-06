import 'error_modules/error/scripts';
import {
    c_error,
    c_crash_handler,
} from 'error_modules/internal';

import {
    u_loading_screen,
    c_loading_screen,
    s_tab_index,
} from 'shared/internal';

export {
    X,
    Ext,
    t,
    vars,
    prevent_default,
    CssVars,
    Viewport,
    Utils,
    NoTr,
    Theme,
    BaseTr,
    Transition,
} from 'shared/internal';

export const { Visibility: LoadingScreenVisibility } = u_loading_screen;
export const { Body: LoadingScreenBody } = c_loading_screen;
export const { Main: TabIndex } = s_tab_index;
export const { Body: CrashHandler } = c_crash_handler;
export const { Body: Error } = c_error;
