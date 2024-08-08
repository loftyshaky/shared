import { computedFn } from 'mobx-utils';

import { i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private input_error_is_visible = computedFn(function ({
        input,
    }: {
        input: i_inputs.Input;
    }): boolean {
        return (
            n(input.is_in_warn_state) &&
            input.is_in_warn_state &&
            n(input.input_errors) &&
            input.input_errors.length !== 0
        );
    });

    public input_error_visibility_cls = computedFn(function (
        this: Class,
        {
            input,
        }: {
            input: i_inputs.Input;
        },
    ): string {
        return this.input_error_is_visible!({ input }) ? '' : 'none';
    });

    public input_error = computedFn(function ({ input }: { input: i_inputs.Input }): string {
        return input.is_in_warn_state && n(input.input_errors)
            ? input.input_errors
                  .reduce(
                      (previous_val, current_val) =>
                          `${previous_val}\r\n${ext.msg(`${current_val}_input_error_text`)}`,
                      '',
                  )
                  .substring(2)
            : '';
    });
}

export const InputError = Class.get_instance();
