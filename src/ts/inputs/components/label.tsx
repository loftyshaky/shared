import { observer } from 'mobx-react-lite';

import type { p_inputs } from 'inputs/internal';
import { s_env } from 'shared_clean/internal';
import type { t } from 'shared_clean/internal';

export const Label: React.FunctionComponent<p_inputs.Label> = observer((props) => {
    const { input } = props;

    return (
        <div className={x.cls(['label', input.name])}>
            {(globalThis as t.AnyRecord)[s_env.Env.type()].msg(`${input.name}_label_text`)}
        </div>
    );
});
