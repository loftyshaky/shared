import React from 'react';
import { observer } from 'mobx-react';

import { o_inputs } from 'inputs/internal';

interface Props {
    link: o_inputs.Link;
}

export const Link = observer((props: Props) => {
    const { link } = props;

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
});
