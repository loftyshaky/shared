import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const Link = observer((props: p_inputs.Link) => {
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
