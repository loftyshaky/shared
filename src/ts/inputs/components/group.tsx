import type { JSX } from 'react';

import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import { c_inputs, d_inputs, type i_inputs, type p_inputs, s_inputs } from 'inputs/internal';

export const Group: React.FunctionComponent<p_inputs.Group> = observer((props) => {
    const { input } = props;
    const include_label: boolean = true;

    const input_w: JSX.Element = n(input.inputs) ? (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls([
                        'input_w',
                        'group',
                        input.name,
                        input.content_is_visible_cls!(),
                    ])}
                    style={{
                        width: d_inputs.InputWidth.width_style!({ input }),
                    }}
                >
                    {Object.values(input.inputs).map(
                        (child_input: i_inputs.InputAndLink): JSX.Element => (
                            <Fragment key={child_input.name}>
                                {s_inputs.resolve({
                                    input: child_input,
                                    id: d_inputs.LabelInInputItem.id({
                                        input: input.get_input!({ child_input }),
                                    }),
                                    calculate_width: input.is_column_layout,
                                    include_label: input.is_column_layout,
                                })}
                            </Fragment>
                        ),
                    )}
                </span>
                {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
            </div>
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    ) : (
        <></>
    );

    return (
        <c_inputs.InputItem
            input={input}
            input_w={input_w}
            include_label={input.label_is_visible_computed!({ include_label })}
        />
    );
});
