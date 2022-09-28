import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const Label: React.FunctionComponent<p_inputs.Label> = observer((props) => {
    const { input } = props;

    return (
        <div className={x.cls(['label', input.name])}>{ext.msg(`${input.name}_label_text`)}</div>
    );
});
