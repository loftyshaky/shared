import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_tr, c_flash, d_flash, s_flash } from 'shared/internal';

export const Body: React.FunctionComponent = observer(() => {
    const flash_server_msg_key: string | undefined = s_flash.Main.i().get_flash_msg_key();

    useEffect(() => {
        d_flash.Visibility.i().hide_flash_with_delay({
            delay: s_flash.Main.i().get_flash_hide_delay(),
        });
    }, []);

    return n(flash_server_msg_key) ? (
        <c_tr.BaseTr
            tag='div'
            name='fade'
            cls={x.cls(['flash', s_flash.Main.i().get_flash_type()])}
            state={d_flash.Visibility.i().flash_is_visible}
        >
            <div onClick={d_flash.Visibility.i().cancel_flash_hide} role='none'>
                <c_flash.CloseBtn />
                <div className='msg'>{ext.msg(flash_server_msg_key)}</div>
            </div>
        </c_tr.BaseTr>
    ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
    );
});
