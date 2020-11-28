import { computedFn } from 'mobx-utils';

import { o_inputs } from 'inputs/internal';

export class Text extends o_inputs.InputBase {
    public type?: 'text' = 'text';
    public text_type?: 'text' | 'number' = 'text';
    public allow_removing_val?: boolean = true;

    public constructor(obj: Text) {
        super(obj);
        Object.assign(
            this,
            obj,
        );
    }

    remove_val_btn_visibility? = computedFn(
        function (this: Text): string {
            return (
                this.allow_removing_val
                && this.val === ''
                    ? 'hidden'
                    : ''
            );
        },
    );
}
