import React from 'react';
import { observer } from 'mobx-react';

import {
    svg,
    BaseTr,
    u_loading_screen,
} from 'shared/internal';

interface Props {
    left?: string;
    top?: string;
    width?: string;
    height?: string;
    show_border?: boolean;
    is_small_svg?: boolean;
}

@observer
export class Body extends React.Component<Props> {
    public static defaultProps = {
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        show_border: false,
        is_small_svg: false,
    };

    public render(): JSX.Element {
        const {
            left,
            top,
            width,
            height,
            show_border,
            is_small_svg,
        } = this.props;

        return (
            <BaseTr
                tag='div'
                name='fade'
                cls={x.cls([
                    'main',
                    'tr_w',
                    'loading_screen',
                    is_small_svg
                        ? 'small_svg'
                        : '',
                    show_border
                        ? 'border'
                        : '',
                    u_loading_screen.Visibility.i.inner_is_none
                        ? 'none'
                        : '',
                ])}
                state={u_loading_screen.Visibility.i.outer_is_visible}
                style={{
                    left: left!,
                    top: top!,
                    width: width!,
                    height: height!,
                }}
            >
                <svg.Hourglass />
            </BaseTr>
        );
    }
}
