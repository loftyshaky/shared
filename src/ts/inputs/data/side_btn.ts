import { computedFn } from 'mobx-utils';

import { i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    is_enabled_cls? = computedFn(function ({
        name,
        input,
    }: {
        name: string;
        input: i_inputs.Input;
    }): string {
        if (n(input.side_btns)) {
            const side_btn_2: i_inputs.SideBtn | undefined = input.side_btns.find(
                (side_btn: i_inputs.SideBtn): boolean =>
                    err(() => side_btn.name === name, 'cnt_4637'),
            );

            if (n(side_btn_2) && n(side_btn_2.is_enabled_cond)) {
                return side_btn_2.is_enabled_cond!({ input }) ? '' : 'is_disabled';
            }
        }

        return '';
    });
}

export const SideBtn = Class.get_instance();
