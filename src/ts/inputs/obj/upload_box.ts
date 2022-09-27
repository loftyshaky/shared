import { makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';

import { o_inputs } from 'inputs/internal';

export class UploadBox extends o_inputs.InputBase {
    public type?: 'upload_box' = 'upload_box';
    public multiple?: boolean = false;
    public accept?: string = '.png,.jpg,.jpeg,.gif';
    public loading_msg_is_visible?: boolean = false;
    public error_msg_is_visible?: boolean = false;
    public is_in_hover_state?: boolean = false;
    public drag_counter?: number = 0;
    public file_names_is_visible?: boolean = false;
    public file_names?: string = '';

    public constructor(obj: UploadBox) {
        super(obj);
        makeObservable<UploadBox, 'loading_msg_is_visible' | 'error_msg_is_visible'>(this, {
            loading_msg_is_visible: observable,
            error_msg_is_visible: observable,
            is_in_hover_state: observable,
            file_names: observable,
        });

        Object.assign(this, obj);
    }

    loading_msg_visibility_cls? = computedFn(function (this: UploadBox): string {
        return this.loading_msg_is_visible ? '' : 'none';
    });

    error_msg_visibility_cls? = computedFn(function (this: UploadBox): string {
        return this.error_msg_is_visible ? '' : 'none';
    });

    loading_cls? = computedFn(function (this: UploadBox): string {
        return this.loading_msg_is_visible ? 'loading' : '';
    });

    file_names_final? = computedFn(function (this: UploadBox): string {
        return rb(this.file_names_is_visible) && n(this.file_names) ? this.file_names : '';
    });
}
