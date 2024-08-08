import React from 'react';
import { observer } from 'mobx-react';

import { d_error } from 'error_modules/internal';

export const KeepVisibleMsg: React.FunctionComponent = observer(() => (
    <div className={x.cls(['keep_visible_msg', d_error.Progress.progress_bar_is_visible_cls])}>
        {ext.msg('error_keep_visible_msg_text')}
    </div>
));
