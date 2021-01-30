export class CssVars {
    private static i0: CssVars;

    public static i(): CssVars {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public get = (
        {
            name,
            el,
        }: {
            name: string;
            el?: HTMLElement;
        },
    ): string => err(() => x.get_css_val(
        n(el)
            ? el
            : document.documentElement,
        `--${name}`,
    ),
    's1013');

    public set_var = (
        {
            roots,
            name,
            val,
        }: {
            roots: HTMLElement[];
            name: string;
            val: string;
        },
    ): void => err(() => {
        roots.forEach((root: HTMLElement): void => {
            root.style.setProperty(
                `--${name}`,
                val,
            );
        });
    },
    's1018');

    public set_transition_vars = (
        {
            roots,
            transition_duration,
        }: {
            roots: HTMLElement[];
            transition_duration: string;
        },
    ): void => err(() => {
        this.set_var({
            roots,
            name: 'transition_duration',
            val: transition_duration,
        });
        this.set_var({
            roots,
            name: 'transition',
            val: `all ${+transition_duration < 1
                ? 1
                : transition_duration}ms ease-out`,
        });
        this.set_var({
            roots,
            name: 'animation',
            val: `${+transition_duration < 1
                ? 1
                : transition_duration}ms ease-out 1 forwards`,
        });
    },
    's1014');
}
