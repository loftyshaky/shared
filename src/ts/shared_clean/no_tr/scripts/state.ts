class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private cls: string = 'no_tr';

    public enable = (
        { el = document.head }: { el?: HTMLElement | ShadowRoot } = { el: document.head },
    ): void =>
        err(() => {
            x.css(this.cls, el);
        }, 'shr_1120');

    public disable = (
        { el = document.head }: { el?: HTMLElement | ShadowRoot } = { el: document.head },
    ): Promise<void> =>
        err_async(async () => {
            await x.delay(500);

            const tr_link = sb<HTMLLinkElement>(el, `.${this.cls}_link`);

            x.remove(tr_link);
        }, 'shr_1121');
}

export const State = Class.get_instance();
