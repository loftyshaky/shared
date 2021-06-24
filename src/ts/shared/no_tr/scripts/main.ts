export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private cls: string = 'no_tr';

    public enable = (
        { el = document.head }: { el?: HTMLElement | ShadowRoot } = { el: document.head },
    ): void =>
        err(() => {
            x.css(this.cls, el);
        }, 'shr_1066');

    public disable = (
        { el = document.head }: { el?: HTMLElement | ShadowRoot } = { el: document.head },
    ): Promise<void> =>
        err_async(async () => {
            await x.delay(500);

            const tr_link = sb<HTMLLinkElement>(el, `.${this.cls}_link`);

            x.remove(tr_link);
        }, 'shr_1067');
}
