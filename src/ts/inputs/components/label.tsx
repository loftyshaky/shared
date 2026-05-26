import React from 'react';
import { observer } from 'mobx-react';

import { s_env } from 'shared_clean/internal';
import { p_inputs } from 'inputs/internal';

export const Label: React.FunctionComponent<p_inputs.Label> = observer((props) => {
    const { input } = props;

    return (
        <div className={x.cls(['label', input.name])}>
            {(globalThis as any)[s_env.Env.type()].msg(`${input.name}_label_text`)}
        </div>
    );
});
