import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const Hr: React.FunctionComponent<p_inputs.Hr> = observer((props) => {
    const { input } = props;

    return <hr className={input.name} />;
});
