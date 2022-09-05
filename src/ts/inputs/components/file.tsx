import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const File: React.FunctionComponent<p_inputs.File> = observer((props) => {
    const { input } = props;

    return (
        <input
            className={x.cls(['file', input.name])}
            name={input.name}
            type='file'
            accept={input.accept}
            value=''
            onChange={(e): void => {
                input.event_callback(
                    {
                        input,
                    },
                    e,
                );
            }}
        />
    );
});
