import React from 'react';
import { observer } from 'mobx-react';

import { s_inputs, o_inputs, p_inputs, i_inputs } from 'inputs/internal';

export const SectionContent: React.FunctionComponent<p_inputs.SectionContent> = observer(
    (props) => {
        const { inputs } = props;

        return (
            <>
                {Object.values(inputs).map(
                    (input: i_inputs.Input | o_inputs.Link, i: number): JSX.Element => (
                        <React.Fragment key={i}>{s_inputs.resolve({ input })}</React.Fragment>
                    ),
                )}
            </>
        );
    },
);
