import { t, s_theme } from 'shared/internal';
import { i_inputs } from 'inputs/internal';

export class Theme {
    private static i0: Theme;

    public static i(): Theme {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
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
                s_theme.Main.i().set({ name, additional_theme_callback });
            }
        }, 'shr_1088');
}
