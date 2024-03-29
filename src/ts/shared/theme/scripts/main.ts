import { t, s_no_tr } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set = ({
        name,
        el = document.head,
        additional_theme_callback,
    }: {
        name: string;
        el?: HTMLElement;
        additional_theme_callback?: t.CallbackVariadicVoid;
    }): Promise<void> =>
        err_async(async () => {
            s_no_tr.Main.i().enable({ el });

            const name_final = `${name}_theme`;
            const loading_screen_root_el = <HTMLDivElement>(
                s('div[class^="root"][class*="loading_screen"]')
            );
            x.css(name_final, el, 'theme_link');

            if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                x.css(name_final, loading_screen_root_el.shadowRoot, 'theme_link');
            }

            if (n(additional_theme_callback)) {
                additional_theme_callback({ name, el });
            }

            await s_no_tr.Main.i().disable({ el });
        }, 'shr_1129');
}
