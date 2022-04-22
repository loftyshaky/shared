import { o_inputs, i_inputs } from 'inputs/internal';

export class Group extends o_inputs.InputBase {
    public type?: 'group' = 'group';
    public inputs?: i_inputs.Inputs;

    public constructor(obj: Group) {
        super(obj);
        Object.assign(this, obj);

        this.inputs = obj.inputs;
    }
}
