import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/internal';
import { u_error } from 'error_modules/internal';

export const CloseBtn = observer(() => (
    <button
        className='close_btn'
        type='button'
        onClick={(): void => u_error.State.i().change_state({
            observable_key: 'is_visible',
            state: false,
        })}
    >
        <svg.Close />
    </button>
));
