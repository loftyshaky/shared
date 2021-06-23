import React from 'react';
import { observer } from 'mobx-react';

export const Body = observer(() => (
    <span className='ext_version'>{`v${ext.get_ext_version()}`}</span>
));