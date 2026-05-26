import { s_env } from 'shared_clean/internal';
import { o_inputs, i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public alt_msg? = ({
        input,
        suffix,
    }: {
        input: i_inputs.InputAndLink;
        suffix: string;
    }): string =>
        err(
            () =>
                n(input.alt_msg)
                    ? input.alt_msg
                    : (globalThis as any)[s_env.Env.type()].msg(`${input.name}_${suffix}`),
            'shr_1320',
        );

    public alt_title? = ({ input, suffix }: { input: o_inputs.Text; suffix: string }): string =>
        err(
            () =>
                n(input.alt_title)
                    ? input.alt_title
                    : (globalThis as any)[s_env.Env.type()].msg(`${input.name}_${suffix}`),
            'shr_1320',
        );
}

export const TextTitle = Class.get_instance();
