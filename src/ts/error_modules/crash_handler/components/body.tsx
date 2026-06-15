import { observer } from 'mobx-react-lite';

import { d_crash_handler, type p_crash_handler, s_crash_handler } from 'error_modules/internal';
import type { t } from 'shared_clean/internal';
import { s_env } from 'shared_clean/internal';

const Body = observer(({ children }: p_crash_handler.Body) => {
    if (d_crash_handler.Visibility.page_is_crashed) {
        return (
            <div className='reload_ui_btn_w'>
                <button
                    className={x.cls(['btn', 'reload_ui'])}
                    type='button'
                    onClick={s_crash_handler.Page.reload}
                >
                    {(globalThis as t.AnyRecord)[s_env.Env.type()].msg('reload_ui_btn_text')}
                </button>
            </div>
        );
    }

    return <>{children}</>;
});

export { Body };
