class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private loading_screen_root_selector: string = 'div[class^="root"][class*="loading_screen"]';

    public enable_no_tr = (): void =>
        err(() => {
            const loading_screen_root_el = <HTMLDivElement>s(this.loading_screen_root_selector);

            if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                x.css('no_tr', loading_screen_root_el.shadowRoot, 'no_tr');
            }
        }, 'shr_1236');

    public disable_no_tr = (): void =>
        err(() => {
            const loading_screen_root_el = <HTMLDivElement>s(this.loading_screen_root_selector);

            if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                x.remove(sb<HTMLLinkElement>(loading_screen_root_el.shadowRoot, '.no_tr'));
            }
        }, 'shr_1236');
}

export const Tr = Class.get_instance();
