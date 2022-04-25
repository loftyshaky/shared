export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public set = (): void =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el)) {
                const title = ext.msg(`${page}_title_text`);

                title_el.textContent =
                    page === 'announcement' ? `${we.runtime.getManifest().name} - ${title}` : title;
            }
        }, 'shr_1229');
}
