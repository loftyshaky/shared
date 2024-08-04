import { computedFn } from 'mobx-utils';

import { i_inputs } from 'inputs/internal';

export class LabelInInputItem {
    private static i0: LabelInInputItem;

    public static i(): LabelInInputItem {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    msg? = computedFn(function ({ input }: { input: i_inputs.Input }): string | undefined {
        return input.alt_msg || ext.msg(`${input.name}_label_text`);
    });
}
