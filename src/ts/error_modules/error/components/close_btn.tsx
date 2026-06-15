import { observer } from 'mobx-react-lite';

import { d_error } from 'error_modules/internal';
import { s_tab_index, svg } from 'shared/internal';

export const CloseBtn: React.FunctionComponent = observer(() => (
    <button
        className='close_btn'
        type='button'
        aria-label='Close'
        onMouseDown={(): void =>
            d_error.State.change_state({
                observable_key: 'is_visible',
                state: false,
            })
        }
        onClick={(): void =>
            d_error.State.change_state({
                observable_key: 'is_visible',
                state: false,
            })
        }
        onKeyDown={s_tab_index.TabIndex.simulate_click_on_enter}
    >
        <svg.Close />
    </button>
));
