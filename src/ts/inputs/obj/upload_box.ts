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
    public filenames_are_visible?: boolean = false;
    public filenames?: string = '';
    public clear_val_on_upload?: boolean = true;

    public constructor(obj: UploadBox) {
        super(obj);
        makeObservable<UploadBox, 'loading_msg_is_visible' | 'error_msg_is_visible'>(this, {
            loading_msg_is_visible: observable,
            error_msg_is_visible: observable,
            is_in_hover_state: observable,
            filenames: observable,
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

    filenames_final? = computedFn(function (this: UploadBox): string {
        return rb(this.filenames_are_visible) && n(this.filenames) ? this.filenames : '';
    });
}
