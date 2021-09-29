import { makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';

import { o_inputs, d_inputs, i_inputs } from 'inputs/internal';

export class Text extends o_inputs.InputBase {
    public type?: 'text' = 'text';
    public text_type?: 'text' | 'number' = 'text';
    public allow_removing_val?: boolean = true;
    public placeholder?: string = '';
    public remove_val_callback?: ({ input }: { input: i_inputs.Input }) => void;

    public constructor(obj: Text) {
        super(obj);
        makeObservable(this, {
            placeholder: observable,
        });

        Object.assign(this, obj);
        this.remove_val_callback = obj.remove_val_callback;
    }

    remove_val_btn_is_visible? = computedFn(function ({ input }: { input: Text }): string {
        return input.text_type === 'number' ||
            !input.allow_removing_val ||
            d_inputs.Val.i().access({ input }) === ''
            ? 'hidden'
            : '';
    });
}
