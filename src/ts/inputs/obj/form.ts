import { o_inputs, i_inputs } from 'inputs/internal';

export class Form extends o_inputs.InputBase {
    public type?: 'form' = 'form';
    public action: string;
    public inputs?: i_inputs.Inputs | i_inputs.Links;

    public constructor(obj: Form) {
        super(obj);
        Object.assign(this, obj);

        this.action = obj.action;
        this.inputs = obj.inputs;
    }
}
