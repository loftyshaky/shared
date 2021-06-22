import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';

import { u_crash_handler, p_crash_handler } from 'error_modules/internal';

export const Body = observer(
    class Body extends React.Component<p_crash_handler.Body> {
        public static getDerivedStateFromError(): any {
            u_crash_handler.Visibility.i().show_reload_ui_screen();
        }

        public componentDidCatch(err_obj: Error): void {
            show_err_ribbon(err_obj, 'shr_1000', { error_msg_key: 'cant_render_ui' });
        }

        public render(): JSX.Element | ReactNode {
            if (u_crash_handler.Visibility.i().page_is_crashed) {
                return (
                    <div className='reload_ui_btn_w'>
                        <button
                            className='btn'
                            type='button'
                            onClick={u_crash_handler.Main.i().reload_page}
                        >
                            {ext.msg('reload_ui_btn_text')}
                        </button>
                    </div>
                );
            }

            const { children } = this.props;

            return children;
        }
    },
);
