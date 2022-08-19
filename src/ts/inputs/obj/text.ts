import { makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from 'shared/internal';
import { o_inputs, d_inputs, i_inputs } from 'inputs/internal';

export class Text extends o_inputs.InputBase {
    public type?: 'text' = 'text';
    public text_type?: 'text' | 'number' | 'email' | 'password' = 'text';
    public allow_removing_val?: boolean = true;
    public placeholder?: string = '';
    public text_btns?: i_inputs.TextBtn[] = [];
    public remove_val_callback?: ({ input }: { input: i_inputs.Input }) => void;
    public paste_callback?: t.CallbackVariadicVoid = () => undefined;

    public constructor(obj: Text) {
        super(obj);
        makeObservable(this, {
            placeholder: observable,
            text_btns: observable,
        });

        Object.assign(this, obj);

        if (n(this.text_btns)) {
            this.text_btns.forEach((text_btn: i_inputs.TextBtn, i: number): void =>
                err(() => {
                    if (n(this.text_btns)) {
                        this.text_btns[i].visibility_cond = n(this.text_btns[i].visibility_cond)
                            ? this.text_btns[i].visibility_cond
                            : () => true;
                    }
                }, 'shr_1208'),
            );
        }

        this.remove_val_callback = obj.remove_val_callback;
    }

    remove_val_btn_is_visible? = computedFn(function ({ input }: { input: Text }): boolean {
        return (
            n(input.allow_removing_val) &&
            input.allow_removing_val &&
            d_inputs.Val.i().access({ input }) !== ''
        );
    });
}
