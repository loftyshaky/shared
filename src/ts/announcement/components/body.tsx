import React from 'react';
import { observer } from 'mobx-react';

import { s_announcement, p_announcement } from 'announcement/internal';

export const Body: React.FunctionComponent<p_announcement.Body> = observer((props) => {
    const { children } = props;

    return (
        <div className='main'>
            <h1 className='header'>{s_announcement.Header.i().get()}</h1>
            <div className='msg_to_user'>{children}</div>
        </div>
    );
});
