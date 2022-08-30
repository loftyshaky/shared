import React from 'react';
import { observer } from 'mobx-react';

import { svg, d_flash } from 'shared/internal';

export const CloseBtn: React.FunctionComponent = observer(() => (
    <button className='close_btn' type='button' onClick={d_flash.Visibility.i().hide_flash}>
        <svg.Close />
    </button>
));
