import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { svg, c_tr, d_loading_screen, p_loading_screen } from 'shared/internal';

export const Body: React.FunctionComponent<p_loading_screen.Body> = observer((props) => {
    const { app_id, on_render } = props;

    useEffect(() => {
        on_render();

        d_loading_screen.Main.i().hide_roots({ app_id });
    }, [app_id, on_render]);

    return (
        <c_tr.BaseTr
            tag='div'
            name='fade'
            cls={x.cls([
                'main',
                'tr_w',
                'loading_screen',
                d_loading_screen.Main.i().inner_visibility_cls,
            ])}
            state={d_loading_screen.Main.i().outer_is_visible}
            style={{
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
            }}
        >
            <svg.Hourglass />
        </c_tr.BaseTr>
    );
});
