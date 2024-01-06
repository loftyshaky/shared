import { o_inputs } from 'inputs/internal';

export class Textarea extends o_inputs.InputBase {
    public type? = 'textarea' as const;

    public constructor(obj: Textarea) {
        super(obj);
        Object.assign(this, obj);
    }
}
