import { observer } from 'mobx-react-lite';

import type { p_inputs } from 'inputs/internal';

export const File: React.FunctionComponent<p_inputs.File> = observer((props) => {
    const { input } = props;

    return (
        <input
            className={x.cls(['file', input.name])}
            name={input.name}
            type='file'
            accept={input.accept}
            multiple={input.multiple}
            value=''
            onChange={(e): void => {
                void input.event_callback(
                    {
                        input,
                    },
                    e,
                );
            }}
        />
    );
});
