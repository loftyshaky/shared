import { computedFn } from 'mobx-utils';
import { i_inputs } from 'inputs/internal';

export class Label {
    private static i0: Label;

    public static i(): Label {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    msg? = computedFn(function ({ input }: { input: i_inputs.Input }): string | undefined {
        return ext.msg(`${input.name}_label_text`) || input.alt_msg;
    });
}
