import 'error_modules/error/scripts';
import { init_error } from 'error_modules/init';

export { c_crash_handler, c_error, d_crash_handler } from 'error_modules/internal';
export {
    X,
    t,
    vars,
    prevent_default,
    stop_propagation,
    o_schema,
    s_color,
    s_css_vars,
    s_data,
    s_no_tr,
    s_service_worker,
    s_theme,
    s_utils,
    s_viewport,
    i_color,
    i_data,
} from 'shared_clean/internal';
export {
    init_shared,
    c_app_version,
    c_loading_screen,
    c_tr,
    o_tr,
    d_loading_screen,
    d_schema,
    d_settings,
    s_loading_screen,
    d_offers,
    s_tab_index,
    s_title,
} from 'shared/internal';

init_error();
