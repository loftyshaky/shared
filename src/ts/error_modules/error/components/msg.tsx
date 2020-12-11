import React from 'react';
import { observer } from 'mobx-react';

import { u_error } from 'error_modules/internal';

export const Msg = observer(() => (
    <div className='msg'>
        {u_error.Msg.i.basic_msg}
        <button
            type='button'
            className={x.cls([
                'more_info_btn',
                u_error.Msg.i.more_info_btn_is_visible_cls,
            ])}
            onClick={(): void => (
                u_error.Msg.i.change_visibility_of_advanced_msg({ is_visible: true })
            )}
        >
            {ext.msg('error_more_info_btn_text')}
        </button>
        <div className={u_error.Msg.i.advanced_msg_is_visible_cls}>
            {u_error.Msg.i.advanced_msg}
        </div>
    </div>
));
