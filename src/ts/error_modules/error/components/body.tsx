import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_error, u_error, s_css, p_error } from 'error_modules/internal';

export const Body = observer((props: p_error.Body) => {
    useEffect(() => {
        const { app_id } = props;

        s_css.Main.i().load({ app_id });
    }, [props]);

    return (
        <div
            className={x.cls([
                'main',
                'error',
                u_error.State.i().is_visible_cls,
                u_error.State.i().is_highlighted_cls,
            ])}
            role='none'
            style={{
                display: u_error.State.i().is_loaded ? '' : 'none',
            }}
            onMouseDown={u_error.State.i().clear_all_reset_state_timeouts}
        >
            <c_error.ExtName />
            <c_error.Msg />
            <c_error.CloseBtn />
        </div>
    );
});
