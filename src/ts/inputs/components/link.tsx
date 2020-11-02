import React from 'react';

import { o_inputs } from 'inputs/internal';

interface Props {
    link: o_inputs.Link;
}

export class Link extends React.Component<Props> {
    public render(): JSX.Element | null {
        const { link } = this.props;

        return (
            rb(link.show_link)
                ? (
                    <a
                        className={x.cls([
                            'link',
                            link.name,
                        ])}
                        href={ru(link.href_final)}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {ru(link.text)}
                    </a>
                )
                : <></>
        );
    }
}
