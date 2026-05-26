import React from 'react';
import { observer } from 'mobx-react';

import { d_app_version } from 'shared/internal';

export const Body: React.FunctionComponent = observer(() => (
    <span className='ext_version'>{`v${ext.get_app_version()}${d_app_version.AppVersion.browser()}`}</span>
));
