import React from 'react';
import { observer } from 'mobx-react';

import { s_title } from 'shared_clean/internal';

export const Body: React.FunctionComponent = observer(() => (
    <div className='main'>
        <h1 className='header'>{s_title.Title.get()}</h1>
        <div
            className='msg_to_user'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                    `msg_to_user_${env.browser}_text`,
                ),
            }}
        />
    </div>
));
