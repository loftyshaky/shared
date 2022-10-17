import React from 'react';
import { observer } from 'mobx-react';

import { p_inputs } from 'inputs/internal';

export const Link: React.FunctionComponent<p_inputs.Link> = observer((props) => {
    const { link } = props;

    return rb(link.show_link) ? (
        <a
            className={x.cls(['link', link.label_type, link.name])}
            href={rs(link.href_final)}
            target={link.target}
            rel='noopener noreferrer'
        >
            {link.label_type === 'svg' && n(link.Svg) ? (
                <link.Svg />
            ) : (
                link.alt_msg || rs(link.text)
            )}
        </a>
    ) : null;
});
