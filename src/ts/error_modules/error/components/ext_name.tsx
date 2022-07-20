import React from 'react';

import { c_app_version } from 'shared/internal';

export const ExtName: React.FunctionComponent = () => (
    <span className='ext_name'>
        {ext.msg('name')} <c_app_version.Body />
    </span>
);
