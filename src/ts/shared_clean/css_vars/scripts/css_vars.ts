class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public get = ({ name, el }: { name: string; el?: HTMLElement }): string =>
        err(() => x.get_css_val(n(el) ? el : document.documentElement, `--${name}`), 'shr_1089');

    public set_var = ({
        roots,
        name,
        val,
    }: {
        roots: HTMLElement[];
        name: string;
        val: string;
    }): void =>
        err(() => {
            roots.forEach((root: HTMLElement): void =>
                err(() => {
                    root.style.setProperty(`--${name}`, val);
                }, 'shr_1090'),
            );
        }, 'shr_1091');

    public set_transition_vars = ({
        roots,
        transition_duration,
    }: {
        roots: HTMLElement[];
        transition_duration: string;
    }): void =>
        err(() => {
            this.set_var({
                roots,
                name: 'transition_duration',
                val: transition_duration,
            });
            this.set_var({
                roots,
                name: 'transition',
                val: `all ${+transition_duration < 1 ? 1 : transition_duration}ms ease-out`,
            });
            this.set_var({
                roots,
                name: 'animation',
                val: `${+transition_duration < 1 ? 1 : transition_duration}ms ease-out 1 forwards`,
            });
        }, 'shr_1092');
}

export const CssVars = Class.get_instance();
