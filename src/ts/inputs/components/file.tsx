import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

import { d_settings } from 'settings/internal';

export const File = observer((props: p_inputs.File) => {
    const { input } = props;

    return (
        <input
            className={x.cls(['file', input.name])}
            type='file'
            accept={input.accept}
            value=''
            onChange={(e): void => {
                d_settings.BackUp.i().upload(
                    {
                        input,
                    },
                    e,
                );
            }}
        />
    );
});
