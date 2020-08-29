import React from 'react';
import { observer } from 'mobx-react';

import { Css, u_error, c_error } from 'modules/internal';

interface Props {
    app_id: string;
}

@observer
export class Body extends React.Component<Props> {
    componentDidMount() {
        const { app_id } = this.props;

        Css.i.load({ app_id });
    }

    public render(): JSX.Element {
        return (
            <div
                className={x.cls([
                    'main',
                    'error',
                    u_error.State.i.is_visible_cls,
                    u_error.State.i.is_highlighted_cls,
                ])}
                role='none'
                onMouseDown={u_error.State.i.clear_all_reset_state_timeouts}
            >
                <c_error.Msg />
                <c_error.CloseBtn />
            </div>
        );
    }
}
