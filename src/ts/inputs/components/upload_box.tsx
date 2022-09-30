import _ from 'lodash';

import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import { prevent_default, c_tr } from 'shared/internal';
import { c_inputs, o_inputs, d_inputs, s_inputs, p_inputs } from 'inputs/internal';

export const UploadBox: React.FunctionComponent<p_inputs.UploadBox> = observer((props) => {
    const file_input_ref = useRef<HTMLInputElement>(null);

    const { input, calculate_width } = props;

    const input_w: JSX.Element = (
        <>
            <div className='input_w_and_help_btn'>
                <span
                    className={x.cls([
                        'input_w',
                        'upload_box',
                        input.name,
                        d_inputs.InputWidth.i().calculate_width_cls({ calculate_width }),
                    ])}
                    style={{
                        minWidth: d_inputs.InputWidth.i().min_width_style!({
                            input,
                            calculate_width,
                        }),
                        maxWidth: d_inputs.InputWidth.i().max_width_style!(),
                    }}
                >
                    <c_tr.BaseTr
                        tag='div'
                        name='upload_box'
                        cls={x.cls(['background', input.loading_cls!()])}
                        attr={{
                            onDragOver: prevent_default,
                            onDragEnter: (): void => {
                                d_inputs.UploadBox.i().highlight({
                                    input,
                                });
                            },
                            onDragLeave: (): void => {
                                d_inputs.UploadBox.i().unhighlight({
                                    input,
                                });
                            },
                            onDrop: (e: DragEvent): void => {
                                d_inputs.UploadBox.i().upload_files(e, {
                                    input,
                                });
                            },
                        }}
                        state={input.is_in_hover_state!}
                    >
                        <input
                            id={input.name}
                            name={input.name}
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
                        <div
                            title={input.filenames_final!()}
                            className={x.cls(['status_msg', 'filenames'])}
                        >
                            {input.filenames_final!()}
                        </div>
                        <div className='what_to_do_msg'>
                            <c_inputs.LinkBtn
                                input={_.merge({}, input, {
                                    name: 'browse',
                                    type: 'link_btn',
                                    event_callback: () =>
                                        s_inputs.UploadBox.i().trigger_click_on_file_input({
                                            file_input: file_input_ref.current,
                                        }),
                                } as o_inputs.LinkBtn)}
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
                    </c_tr.BaseTr>
                </span>
                {input.include_help ? <c_inputs.HelpBtn section_or_input={input} /> : undefined}
            </div>
            {input.include_help ? <c_inputs.Help section_or_input={input} /> : undefined}
        </>
    );

    return <c_inputs.InputItem input={input} input_w={input_w} include_label />;
});
