import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';

import { u_crash_handler } from 'modules/internal';

interface Props {
    children: JSX.Element;
}

@observer
export class Body extends React.Component<Props> {
    public static getDerivedStateFromError(): any {
        u_crash_handler.Visibility.i.change_visibility_of_reload_ui_screen({ is_visible: true });
    }

    public componentDidCatch(err_obj: Error): void {
        show_err_ribbon(err_obj,
            's1000',
            { error_msg_key: 'cant_render_ui' });
    }

    public render(): JSX.Element | ReactNode {
        if (u_crash_handler.Visibility.i.page_is_crashed) {
            return (
                <div className='reload_ui_btn_w'>
                    <button
                        className='btn'
                        type='button'
                        onClick={(): void => (
                            u_crash_handler.Visibility.i.change_visibility_of_reload_ui_screen(
                                { is_visible: false },
                            )
                        )}
                    >
                        {ext.msg('reload_ui_btn_text')}
                    </button>
                </div>
            );
        }

        const { children } = this.props;

        return children;
    }
}
