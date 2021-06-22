import { o_inputs } from 'inputs/internal';

export class Select extends o_inputs.InputBase {
    public type?: 'select' = 'select';
    public options: { [index: string]: o_inputs.Option[] } = {};

    public constructor(obj: Select) {
        super(obj);
        Object.assign(this, obj);
        this.options = obj.options;
    }

    public option_text? = ({ i }: { i: number }): string =>
        err(() => {
            const option: o_inputs.Option = this.options[this.name][i];

            return option.alt_msg || ext.msg(`${option.name}_option_text`) || option.name;
        }, 's1063');
}
