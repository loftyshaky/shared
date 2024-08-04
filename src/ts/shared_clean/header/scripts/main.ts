export class Header {
    private static i0: Header;

    public static i(): Header {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public get = (): string =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el) && n(title_el.textContent)) {
                return title_el.textContent;
            }

            return '';
        }, 'shr_1230');
}
