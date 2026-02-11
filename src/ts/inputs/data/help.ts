import { makeObservable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { o_inputs, d_inputs, i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            change_visibility: action,
        });
    }

    public change_visibility = ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): void =>
        err(() => {
            const new_input: o_inputs.Section | i_inputs.Input = section_or_input;

            new_input.help_is_visible = !new_input.help_is_visible;
        }, 'shr_1045');

    width_style? = computedFn(function ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): number | string | undefined {
        const section_name: string | undefined = (section_or_input as i_inputs.Input).section;
        const is_input: boolean = n(section_name);

        if (n(section_name)) {
            return is_input
                ? d_inputs.InputWidth.width_style!({
                      input: section_or_input as i_inputs.Input,
                  })
                : '';
        }

        return undefined;
    });

    msg? = computedFn(function ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): string | undefined {
        return n(section_or_input.alt_help_msg)
            ? (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                  section_or_input.alt_help_msg,
              ) || section_or_input.alt_help_msg
            : (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                  `${section_or_input.name}_help_text`,
              );
    });
}

export const Help = Class.get_instance();
