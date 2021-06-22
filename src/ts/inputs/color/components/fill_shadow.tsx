import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { p_color, s_color } from 'inputs/internal';

export const FillShadow = observer((props: p_color.FillShadow) => {
    useEffect(() => {
        const { is_visible } = props;

        if (is_visible) {
            s_color.Position.i().set();
        }
    });

    const { is_visible, width, height } = props;

    // eslint-disable-next-line no-unused-expressions
    is_visible;

    return (
        <span className='fill_shadow_w'>
            <span
                className='fill_shadow'
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            />
        </span>
    );
});
