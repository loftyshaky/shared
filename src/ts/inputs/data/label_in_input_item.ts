import { makeObservable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from 'shared_clean/internal';
import { d_inputs, i_inputs, o_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public constructor() {
        makeObservable(this, {
            toggle_edit_label_state: action,
        });
    }

    msg? = computedFn(function ({ input }: { input: i_inputs.Input }): string | undefined {
        return (
            input.alt_msg ||
            (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                `${input.name}_label_text`,
            ) ||
            x.underscore_to_readable(input.name)
        );
    });

    label_text_computed? = computedFn(function ({
        input,
    }: {
        input: i_inputs.Input;
    }): string | undefined {
        return input.type === 'group' && n(input.label_val)
            ? input.label_val
            : d_inputs.LabelInInputItem.msg!({ input });
    });

    public toggle_edit_label_state? = ({
        input,
        callback,
    }: {
        input: i_inputs.Input;
        callback: t.CallbackVariadicVoid;
    }): void =>
        err(() => {
            if (n(input.val_accessor)) {
                const val_accessor_arr: string[] = input.val_accessor.split('.');

                input.label_val = n(input.label_val)
                    ? input.label_val
                    : val_accessor_arr[val_accessor_arr.length - 1];

                if ((input as o_inputs.Group).editing_label) {
                    (input as o_inputs.Group).editing_label = false;
                } else {
                    (input as o_inputs.Group).editing_label = true;
                }

                callback({ input });
            }
        }, 'shr_1306');
}

export const LabelInInputItem = Class.get_instance();
