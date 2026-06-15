import { observer } from 'mobx-react-lite';

import { d_app_version } from 'shared/internal';
import type { t } from 'shared_clean/internal';
import { s_env } from 'shared_clean/internal';

export const Body: React.FunctionComponent = observer(() => (
    <span className='ext_version'>{`v${(globalThis as t.AnyRecord)[s_env.Env.type()].get_app_version()}${d_app_version.AppVersion.browser()}`}</span>
));
