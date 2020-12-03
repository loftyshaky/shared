import { NoTr } from 'shared/internal';

export class Theme {
    private static i0: Theme;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public set = (
        {
            name,
            el = document.head,
        }: {
            name: 'light' | 'dark' | 'very_dark';
            el?: HTMLElement;
        },
    ): void => err(() => {
        NoTr.i.enable({ el });

        const name_final = `${name}_theme`;
        const loading_screen_root_el = <HTMLDivElement>s('div[class^="root"][class*="loading_screen"]');
        x.css(
            name_final,
            el,
            'theme_link',
        );

        if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
            x.css(
                name_final,
                loading_screen_root_el.shadowRoot,
                'theme_link',
            );
        }

        NoTr.i.disable({ el });
    },
    's1019');
}
