import { o_inputs, i_inputs } from 'inputs/internal';

export class Select extends o_inputs.InputBase {
    public type? = 'select' as const;
    public options: i_inputs.Options = {};

    public constructor(obj: Select) {
        super(obj);
        Object.assign(this, obj);
        this.options = obj.options;
    }

    public option_text? = ({ i }: { i: number }): string =>
        err(() => {
            const option: o_inputs.Option = this.options[this.name][i];

            return option.alt_msg || ext.msg(`${option.name}_option_text`) || option.name;
        }, 'shr_1072');
}
