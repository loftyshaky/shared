import 'error_modules/error/scripts';
import { init_page } from 'shared/internal';

export { c_crash_handler, c_error } from 'error_modules/internal';
export {
    Ext,
    X,
    t,
    vars,
    prevent_default,
    init_shared,
    s_keep_alive,
    c_loading_screen,
    c_tr,
    o_tr,
    d_loading_screen,
    s_css_vars,
    s_no_tr,
    s_tab_index,
    s_theme,
    s_utils,
    s_viewport,
    i_data,
} from 'shared/internal';

init_page(); // need to be here, otherwise error will happen
