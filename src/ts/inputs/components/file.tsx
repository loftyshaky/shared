import React from 'react';
import { observer } from 'mobx-react';

import {
    o_inputs,
} from 'inputs/internal';

import {
    d_settings,
} from 'settings/internal';

interface Props {
    input: o_inputs.File;
}

export const File = observer((props: Props) => {
    const { input } = props;

    return (
        <input
            className={x.cls([
                'file',
                input.name,
            ])}
            type='file'
            accept={input.accept}
            value=''
            onChange={(e): void => {
                d_settings.BackUp.i.upload(
                    {
                        input,
                    },
                    e,
                );
            }}
        />
    );
});
