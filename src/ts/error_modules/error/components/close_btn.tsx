import React from 'react';
import { observer } from 'mobx-react';

import { svg, s_tab_index } from 'shared/internal';
import { d_error } from 'error_modules/internal';

export const CloseBtn: React.FunctionComponent = observer(() => (
    <button
        className='close_btn'
        type='button'
        aria-label='Close'
        onMouseDown={(): void =>
            d_error.State.i().change_state({
                observable_key: 'is_visible',
                state: false,
            })
        }
        onClick={(): void =>
            d_error.State.i().change_state({
                observable_key: 'is_visible',
                state: false,
            })
        }
        onKeyDown={s_tab_index.Main.i().simulate_click_on_enter}
    >
        <svg.Close />
    </button>
));
