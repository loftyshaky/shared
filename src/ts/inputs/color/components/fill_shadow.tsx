import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { s_color, p_color } from 'inputs/internal';

export const FillShadow: React.FunctionComponent<p_color.FillShadow> = observer((props) => {
    useEffect(() =>
        err(() => {
            const { is_visible } = props;

            if (is_visible) {
                s_color.Position.i().set();
            }
        }, 'shr_1158'),
    );

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
