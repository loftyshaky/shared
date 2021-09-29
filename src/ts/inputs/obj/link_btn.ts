import { o_inputs } from 'inputs/internal';

export class LinkBtn extends o_inputs.InputBase {
    public type?: 'link_btn' = 'link_btn';

    public constructor(obj: LinkBtn) {
        super(obj);
        Object.assign(this, obj);
    }
}
