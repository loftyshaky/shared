import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_error, d_error, s_css, p_error } from 'error_modules/internal';

export const Body: React.FunctionComponent<p_error.Body> = observer((props) => {
    const { app_id, on_render } = props;

    useEffect(() => {
        s_css.Css.load({ app_id });

        on_render();
    }, [app_id, on_render]);

    return (
        <div
            className={x.cls([
                'main',
                'error',
                d_error.State.is_highlighted_cls,
                d_error.State.notification_type,
                d_error.State.is_fullscreen_cls,
            ])}
            role='none'
            style={{
                display: d_error.State.is_visible_style,
            }}
            onMouseDown={d_error.State.clear_all_reset_state_timeouts}
        >
            <c_error.Progress />
            <div className='body'>
                <div className='top_stuff'>
                    <span className='ext_name_and_keep_visible_msg'>
                        <c_error.ExtName />
                        <c_error.KeepVisibleMsg />
                    </span>
                    {d_error.State.is_fullscreen ? undefined : <c_error.CloseBtn />}
                </div>
                <c_error.Msg />
            </div>
        </div>
    );
});
