import { computedFn } from 'mobx-utils';

import {
    d_inputs,
    o_inputs,
} from 'inputs/internal';

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

    remove_val_btn_is_visible? = computedFn(
        function ({ input }: { input: Text; }): string {
            return (
                input.allow_removing_val
                && d_inputs.Val.i.access({ input }) === ''
                    ? 'hidden'
                    : ''
            );
        },
    );
}
