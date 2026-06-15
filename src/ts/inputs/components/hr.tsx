import { observer } from 'mobx-react-lite';

import type { p_inputs } from 'inputs/internal';

export const Hr: React.FunctionComponent<p_inputs.Hr> = observer((props) => {
    const { input } = props;

    return <hr className={input.name} />;
});
