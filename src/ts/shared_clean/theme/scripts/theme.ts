import { t, s_no_tr } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
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
            s_no_tr.State.enable({ el });

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

            await s_no_tr.State.disable({ el });
        }, 'shr_1129');
}

export const Theme = Class.get_instance();
