import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import { d_inputs, c_inputs, s_inputs, p_inputs } from 'inputs/internal';

export const UploadBox: React.FunctionComponent<p_inputs.UploadBox> = observer((props) => {
    const file_input_ref = useRef<HTMLInputElement>(null);

    const { input } = props;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls(['input_w', 'upload_box', input.name, 'calculate_width'])}
                    style={{
                        minWidth: d_inputs.InputWidth.i().min_width_style!({ input }),
                        maxWidth: d_inputs.InputWidth.i().max_width_style!(),
                    }}
                >
                    <input
                        id={input.name}
                        className='input'
                        type='file'
                        accept={input.accept}
                        multiple={input.multiple}
                        ref={file_input_ref}
                        onChange={(e): void => {
                            d_inputs.UploadBox.i().upload_files(e, {
                                input,
                                file_input: file_input_ref.current,
                            });
                        }}
                    />
                    <div className='what_to_do_msg'>
                        <c_inputs.LinkBtn
                            name='browse'
                            on_click={() =>
                                s_inputs.UploadBox.i().trigger_click_on_file_input({
                                    file_input: file_input_ref.current,
                                })
                            }
                        />
                        <span>{` ${ext.msg('drag_files_msg_text')}`}</span>
                    </div>
                    <div
                        className={x.cls([
                            'status_msg',
                            'loading',
                            input.loading_msg_visibility_cls!(),
                        ])}
                    >
                        {ext.msg('loading_msg_text')}
                    </div>
                    <div
                        className={x.cls([
                            'status_msg',
                            'error',
                            input.error_msg_visibility_cls!(),
                        ])}
                    >
                        {ext.msg('an_error_occured_msg')}
                    </div>
                    <div className={x.cls(['background', input.loading_cls!()])} />
                </span>
                {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
            </div>
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    );

    return <c_inputs.InputItem input={input} input_w={input_w} include_label />;
});
