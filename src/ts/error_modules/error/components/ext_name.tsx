import React from 'react';

import { s_env } from 'shared_clean/internal';
import { c_app_version } from 'shared/internal';

export const ExtName: React.FunctionComponent = () => (
    <div className='ext_name'>
        {(globalThis as any)[s_env.Env.type()].msg('name')} <c_app_version.Body />
    </div>
);
