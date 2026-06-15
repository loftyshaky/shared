import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { type p_color, s_color } from 'inputs/internal';

export const FillShadow: React.FunctionComponent<p_color.FillShadow> = observer((props) => {
    const { is_visible, width, height } = props;

    void is_visible;

    useEffect(() =>
        err(() => {
            const { is_visible } = props;

            if (is_visible) {
                s_color.Position.set();
            }
        }, 'shr_1005'),
    );

    return (
        <span className='fill_shadow_w'>
            <span
                className='fill_shadow'
                style={{
                    width,
                    height,
                }}
            />
        </span>
    );
});
