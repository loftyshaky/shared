import { observer } from 'mobx-react-lite';

import { d_app_version } from 'shared/internal';

export const Body: React.FunctionComponent = observer(() => (
    <span className='ext_version'>{`${d_app_version.AppVersion.version()}${d_app_version.AppVersion.suffix()}`}</span>
));
