import { o_inputs, d_inputs } from 'inputs/internal';

export class Btn extends o_inputs.InputBase {
    public type? = 'btn' as const;
    public btn_type?: 'btn' | 'submit' = 'btn';

    public constructor(obj: Btn) {
        super(obj);
        Object.assign(this, obj);
    }

    public btn_text? = (): string =>
        err(() => d_inputs.TextTitle.alt_msg!({ input: this, suffix: 'btn_text' }), 'shr_1321');
}
