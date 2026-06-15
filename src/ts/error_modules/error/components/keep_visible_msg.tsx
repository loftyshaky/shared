import { observer } from 'mobx-react-lite';

import { d_error } from 'error_modules/internal';
import type { t } from 'shared_clean/internal';
import { s_env } from 'shared_clean/internal';

export const KeepVisibleMsg: React.FunctionComponent = observer(() => (
    <div className={x.cls(['keep_visible_msg', d_error.Progress.progress_bar_is_visible_cls])}>
        {(globalThis as t.AnyRecord)[s_env.Env.type()].msg('error_keep_visible_msg_text')}
    </div>
));
