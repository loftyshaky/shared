import { observer } from 'mobx-react-lite';

import type { t } from 'shared_clean/internal';
import { s_env, s_title } from 'shared_clean/internal';

export const Body: React.FunctionComponent = observer(() => (
    <div className='main'>
        <h1 className='header'>{s_title.Title.get()}</h1>
        <div
            className='msg_to_user'
            dangerouslySetInnerHTML={{
                __html: (globalThis as t.AnyRecord)[s_env.Env.type()].msg(
                    `msg_to_user_${env.browser}_text`,
                ),
            }}
        />
    </div>
));
