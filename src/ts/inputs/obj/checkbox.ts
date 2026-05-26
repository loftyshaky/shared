import { computedFn } from 'mobx-utils';
import { o_inputs, d_inputs } from 'inputs/internal';

export class Checkbox extends o_inputs.InputBase {
    public type? = 'checkbox' as const;

    public constructor(obj: Checkbox) {
        super(obj);
        Object.assign(this, obj);
    }

    width_accessed? = computedFn(function (this: Checkbox): number | string | undefined {
        return n(this.section) ? d_inputs.InputWidth.width : 'auto';
    });
}
