import 'error_modules/error/scripts';
import { init_error } from 'error_modules/init';

export { c_crash_handler, c_error, d_crash_handler } from 'error_modules/internal';
export {
    X,
    t,
    vars,
    prevent_default,
    stop_propagation,
    init_shared,
    c_app_version,
    c_loading_screen,
    c_tr,
    o_schema,
    o_tr,
    d_loading_screen,
    d_schema,
    d_settings,
    s_css_vars,
    s_data,
    s_loading_screen,
    s_no_tr,
    d_offers,
    s_service_worker,
    s_tab_index,
    s_theme,
    s_title,
    s_utils,
    s_viewport,
    i_data,
} from 'shared/internal';

init_error();
