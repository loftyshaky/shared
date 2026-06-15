import { c_app_version } from 'shared/internal';
import { s_env } from 'shared_clean/internal';
import type { t } from 'shared_clean/internal';

export const ExtName: React.FunctionComponent = () => (
    <div className='ext_name'>
        {(globalThis as t.AnyRecord)[s_env.Env.type()].msg('name')} <c_app_version.Body />
    </div>
);
