import React from 'react';
import { observer } from 'mobx-react';

import {
    o_inputs,
    c_inputs,
} from 'inputs/internal';

interface Props {
    sections: { [index: string]: o_inputs.Section };
}

@observer
export class Body extends React.Component<Props> {
    public render(): JSX.Element {
        const { sections } = this.props;

        return (
            <div className='main'>
                <div className='main_2'>
                    <div
                        className='sections'
                    >
                        {
                            Object.values(sections).map((
                                section: o_inputs.Section,
                                i: number,
                            ): JSX.Element => (
                                <c_inputs.Section
                                    key={i}
                                    section={section}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
