import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/internal';
import {
    d_inputs,
    c_inputs,
    p_inputs,
} from 'inputs/internal';

export const Checkbox = observer((props: p_inputs.Checkbox) => {
    const { input } = props;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls([
                        'input_w',
                        'checkbox',
                        input.name,
                    ])}
                >
                    { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className='wrap_label'>
                        <input
                            id={input.name}
                            type='checkbox'
                            checked={d_inputs.Val.i().access({ input })}
                            onChange={(e): void => {
                                d_inputs.Val.i().change(
                                    {
                                        input,
                                    },
                                    e,
                                );
                            }}
                        />
                        <span
                            className='box'
                            role='button'
                            tabIndex={0}
                        >
                            <svg.Check />
                        </span>
                    </label>
                </span>
                <c_inputs.Label input={input} />
                {
                    input.include_help
                        ? <c_inputs.HelpBtn section_or_input={input} />
                        : undefined
                }
            </div>
            {
                input.include_help
                    ? <c_inputs.Help section_or_input={input} />
                    : undefined
            }
        </>
    );

    return (
        <c_inputs.InputItem
            input={input}
            input_w={input_w}
            include_label={false}
        />
    );
});
