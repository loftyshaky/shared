import { observer } from 'mobx-react-lite';

import { o_inputs, type p_inputs } from 'inputs/internal';
import { c_tr } from 'shared/internal';
import { stop_propagation } from 'shared_clean/internal';

export const LinkIconBtn: React.FunctionComponent<p_inputs.LinkIconBtn> = observer((props) => {
    const { input, type } = props;

    return (
        <c_tr.BaseTr
            tag='span'
            name='fade'
            cls={x.cls(['btn_w', `${type}_btn_w`, input.is_enabled_cls!(), input.name])}
            attr={{
                title: input.icon_btn_title!(),
                onClick: () => {
                    void input.event_callback({ input });
                },
                onKeyDown: stop_propagation,
            }}
            state={input.cut_features_is_visible_computed!()}
            style={{ marginLeft: x.px(input.offset) }}
        >
            <button
                className={x.cls(['btn', `${type}_btn`])}
                type='button'
                tabIndex={input.tab_index!()}
            >
                {input instanceof o_inputs.IconBtn ? (
                    <input.Svg />
                ) : (
                    <span>{input.icon_btn_text!({ input })}</span>
                )}
            </button>
        </c_tr.BaseTr>
    );
});
