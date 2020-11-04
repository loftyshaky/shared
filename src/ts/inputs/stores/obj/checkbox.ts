import { o_inputs } from 'inputs/internal';

export class Checkbox extends o_inputs.InputBase {
    public type?: 'checkbox' = 'checkbox';

    public constructor(obj: Checkbox) {
        super(obj);
        Object.assign(
            this,
            obj,
        );
    }
}
