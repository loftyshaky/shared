import React from 'react';
import { observer } from 'mobx-react';

import { d_error } from 'error_modules/internal';

export const Msg: React.FunctionComponent = observer(() => (
    <div className='msg'>
        {d_error.Msg.basic_msg}
        {d_error.State.notification_type === 'error' ? (
            <>
                <button
                    type='button'
                    className={x.cls(['more_info_btn', d_error.Msg.more_info_btn_is_visible_cls])}
                    onClick={(): void =>
                        d_error.Msg.change_visibility_of_advanced_msg({ is_visible: true })
                    }
                >
                    {(globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                        'error_more_info_btn_text',
                    )}
                </button>
                <div className={d_error.Msg.advanced_msg_is_visible_cls}>
                    {d_error.Msg.advanced_msg}
                </div>
            </>
        ) : undefined}
    </div>
));
