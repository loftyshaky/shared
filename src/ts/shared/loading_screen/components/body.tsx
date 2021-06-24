import React from 'react';
import { observer } from 'mobx-react';

import { svg, c_tr, u_loading_screen, p_loading_screen } from 'shared/internal';

export const Body: React.FunctionComponent<p_loading_screen.Body> = observer((props) => {
    const {
        left = '0',
        top = '0',
        width = '100%',
        height = '100%',
        show_border = false,
        is_small_svg = false,
    } = props;

    return (
        <c_tr.BaseTr
            tag='div'
            name='fade'
            cls={x.cls([
                'main',
                'tr_w',
                'loading_screen',
                is_small_svg ? 'small_svg' : '',
                show_border ? 'border' : '',
                u_loading_screen.Visibility.i().inner_is_none ? 'none' : '',
            ])}
            state={u_loading_screen.Visibility.i().outer_is_visible}
            style={{
                left: left!,
                top: top!,
                width: width!,
                height: height!,
            }}
        >
            <svg.Hourglass />
        </c_tr.BaseTr>
    );
});
