import { makeObservable, action } from 'mobx';
import { computedFn } from 'mobx-utils';
import { o_inputs, d_inputs, i_inputs } from 'inputs/internal';

export class Help {
    private static i0: Help;

    public static i(): Help {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
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
        }, 'shr_1027');

    width_style? = computedFn(function ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): number | string | undefined {
        const section_name: string | undefined = (section_or_input as i_inputs.Input).section;
        const is_input: boolean = n(section_name);

        if (n(section_name)) {
            return is_input ? x.px(d_inputs.InputWidth.i().width[section_name]) : '';
        }

        return undefined;
    });

    msg? = computedFn(function ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): string | undefined {
        return ext.msg(`${section_or_input.name}_help_text`) || section_or_input.alt_help_msg;
    });
}
