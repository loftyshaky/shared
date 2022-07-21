export class Tr {
    private static i0: Tr;

    public static i(): Tr {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private loading_screen_root_selector: string = 'div[class^="root"][class*="loading_screen"]';

    public enable_no_tr = (): void =>
        err(() => {
            const loading_screen_root_el = <HTMLDivElement>s(this.loading_screen_root_selector);

            if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                x.css('no_tr', loading_screen_root_el.shadowRoot, 'no_tr');
            }
        }, 'cnt_1236');

    public disable_no_tr = (): void =>
        err(() => {
            const loading_screen_root_el = <HTMLDivElement>s(this.loading_screen_root_selector);

            if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                x.remove(sb<HTMLLinkElement>(loading_screen_root_el.shadowRoot, '.no_tr'));
            }
        }, 'cnt_1236');
}
