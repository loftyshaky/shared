import React from 'react';
import { observer } from 'mobx-react';

import { s_header } from 'shared_clean/internal';

export const Body: React.FunctionComponent = observer(() => (
    <div className='main'>
        <h1 className='header'>{s_header.Header.i().get()}</h1>
        <div
            className='msg_to_user'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: ext.msg(`msg_to_user_${env.browser}_text`) }}
        />
    </div>
));
