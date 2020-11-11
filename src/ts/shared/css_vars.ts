export class CssVars {
    private static i0: CssVars;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public get = (
        {
            name,
            el,
        }: {
            name: string;
            el?: HTMLElement;
        },
    ): number | string => err(() => x.get_css_val(
        n(el)
            ? el
            : document.documentElement,
        `--${name}`,
    ),
    's1013');

    public set_transition_vars = (
        {
            roots,
            transition_duration,
        }: {
            roots: HTMLElement[];
            transition_duration: string;
        },
    ): void => err(() => {
        roots.forEach((root: HTMLElement): void => {
            root.style.setProperty(
                '--transition_duration',
                transition_duration,
            );
            root.style.setProperty(
                '--transition',
                `all ${+transition_duration < 1
                    ? 1
                    : transition_duration}ms ease-out`,
            );
            root.style.setProperty(
                '--animation',
                `${+transition_duration < 1
                    ? 1
                    : transition_duration}ms ease-out 1 forwards`,
            );
        });
    },
    's1014');
}
