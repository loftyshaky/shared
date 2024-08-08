import { computedFn } from 'mobx-utils';

import { i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    msg? = computedFn(function ({ input }: { input: i_inputs.Input }): string | undefined {
        return input.alt_msg || ext.msg(`${input.name}_label_text`);
    });
}

export const LabelInInputItem = Class.get_instance();
