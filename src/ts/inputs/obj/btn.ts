import { o_inputs } from 'inputs/internal';

export class Btn extends o_inputs.InputBase {
    public type?: 'btn' = 'btn';

    public constructor(obj: Btn) {
        super(obj);
        Object.assign(this, obj);
    }
}
