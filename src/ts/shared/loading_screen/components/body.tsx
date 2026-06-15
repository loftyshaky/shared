import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import {
    c_tr,
    d_loading_screen,
    type p_loading_screen,
    s_loading_screen,
    svg,
} from 'shared/internal';

export const Body: React.FunctionComponent<p_loading_screen.Body> = observer((props) => {
    const { app_id, on_render } = props;

    useEffect(() => {
        on_render();

        s_loading_screen.Roots.hide_roots({ app_id });
    }, [app_id, on_render]);

    return (
        <c_tr.BaseTr
            tag='div'
            name='fade'
            cls={x.cls([
                'main',
                'tr_w',
                'loading_screen',
                d_loading_screen.Visibility.inner_visibility_cls,
            ])}
            state={d_loading_screen.Visibility.outer_is_visible}
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
