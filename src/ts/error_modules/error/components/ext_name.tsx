import React from 'react';

import { c_app_version } from 'shared/internal';

export const ExtName: React.FunctionComponent = () => (
    <div className='ext_name'>
        {(globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg('name')} <c_app_version.Body />
    </div>
);
