import React from 'react';
import { observer } from 'mobx-react';

import { d_error } from 'error_modules/internal';

export const Progress: React.FunctionComponent = observer(() => (
    <progress
        className={x.cls(['progress', d_error.Progress.progress_bar_is_visible_cls])}
        max={d_error.Progress.progress_max}
        value={d_error.Progress.progress_val}
    />
));
