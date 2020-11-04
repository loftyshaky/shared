import React from 'react';
import { observer } from 'mobx-react';

import {
    o_inputs,
} from 'inputs/internal';

interface Props {
    section: o_inputs.Section;
}

@observer
export class SectionBtn extends React.Component<Props> {
    public render(): JSX.Element {
        const { section } = this.props;

        return (
            <button
                className={x.cls([
                    'section_btn',
                    section.name,
                ])}
                type='button'
                onClick={() => null}
            >
                {ext.msg(`${section.name}_section_text`)}
            </button>
        );
    }
}
