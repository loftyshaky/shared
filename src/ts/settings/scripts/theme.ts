import { t, s_theme } from 'shared_clean/internal';
import { i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public change = ({
        input,
        name,
        additional_theme_callback,
    }: {
        input: i_inputs.Input;
        name: string;
        additional_theme_callback?: t.CallbackVariadicVoid;
    }): void =>
        err(() => {
            if (input.name === 'options_page_theme') {
                s_theme.Theme.set({ name, additional_theme_callback });
            }
        }, 'shr_1088');
}

export const Theme = Class.get_instance();
