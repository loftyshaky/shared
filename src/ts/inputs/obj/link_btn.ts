import { o_inputs, i_inputs } from 'inputs/internal';

export class LinkBtn extends o_inputs.InputBase {
    public type? = 'link_btn' as const;
    public btn_options?: i_inputs.BtnOption[];

    public constructor(obj: LinkBtn) {
        super(obj);
        Object.assign(this, obj);
    }
}
