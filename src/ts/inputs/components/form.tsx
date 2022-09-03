import React from 'react';

import { observer } from 'mobx-react';
import { s_inputs, o_inputs, p_inputs, i_inputs } from 'inputs/internal';

export const Form: React.FunctionComponent<p_inputs.Form> = observer((props) => {
    const { input } = props;

    return n(input.inputs) ? (
        <form className='input_item_form' action={input.action} method='POST'>
            {Object.values(input.inputs).map(
                (input_2: i_inputs.Input | o_inputs.Link, i: number): JSX.Element => (
                    <React.Fragment key={i}>{s_inputs.resolve({ input: input_2 })}</React.Fragment>
                ),
            )}
        </form>
    ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
    );
});
