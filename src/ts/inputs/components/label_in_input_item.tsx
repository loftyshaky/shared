import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, d_inputs, o_inputs, p_inputs } from 'inputs/internal';

export const LabelInInputItem: React.FunctionComponent<p_inputs.LabelInInputItem> = observer(
    (props) => {
        const { input } = props;
        const edit_label_input =
            input.type === 'group'
                ? new o_inputs.Text({
                      name: `${input.name}_edit_label_input`,
                      val_accessor: input.val_accessor,
                      event_callback: input.edit_label_val!,
                  })
                : undefined;

        return (
            <div
                className={x.cls([
                    'label_in_input_item_w',
                    n((input as o_inputs.Group).content_is_visible_margin_cls)
                        ? (input as o_inputs.Group).content_is_visible_margin_cls!()
                        : '',
                ])}
            >
                {input.type === 'group' ? <c_inputs.SideBtns input={input} /> : undefined}
                {input.type === 'group' && input.editing_label && n(edit_label_input) ? (
                    <c_inputs.Text
                        input={edit_label_input}
                        calculate_width
                        include_label={false}
                        parent_input={input}
                    />
                ) : (
                    <label className='label_in_input_item' htmlFor={input.name}>
                        {d_inputs.LabelInInputItem.label_text_computed!({ input })}
                    </label>
                )}
            </div>
        );
    },
);
