import type { JSX } from 'react';

import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import { type i_inputs, type o_inputs, type p_inputs, s_inputs } from 'inputs/internal';

export const Form: React.FunctionComponent<p_inputs.Form> = observer((props) => {
    const { input } = props;

    return n(input.inputs) ? (
        <form
            className='input_item_form'
            action={input.action}
            method='POST'
            encType='multipart/form-data'
        >
            {Object.values(input.inputs).map(
                (input_2: i_inputs.Input | o_inputs.Link): JSX.Element => (
                    <Fragment key={input_2.name}>{s_inputs.resolve({ input: input_2 })}</Fragment>
                ),
            )}
        </form>
    ) : (
        <></>
    );
});
