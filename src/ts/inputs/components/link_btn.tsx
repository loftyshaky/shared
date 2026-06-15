import { observer } from 'mobx-react-lite';

import { c_inputs, type p_inputs } from 'inputs/internal';

export const LinkBtn: React.FunctionComponent<p_inputs.LinkBtn> = observer((props) => {
    const { input } = props;

    return <c_inputs.LinkIconBtn input={input} type='link' />;
});
