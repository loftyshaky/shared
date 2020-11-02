import React from 'react';
import { observer } from 'mobx-react';

import {
    s_inputs,
    o_inputs,
    i_inputs,
} from 'inputs/internal';

interface Props {
    inputs: i_inputs.Input[];
}

@observer
export class SectionContent extends React.Component<Props> {
    public render(): JSX.Element {
        const { inputs } = this.props;

        return (
            <>
                {
                    Object.values(inputs).map(
                        (
                            input: i_inputs.Input | o_inputs.Link,
                            i: number,
                        ): JSX.Element => (
                            <React.Fragment key={i}>
                                {
                                    s_inputs.resolve({ input })
                                }
                            </React.Fragment>
                        ),
                    )
                }
            </>
        );
    }
}
