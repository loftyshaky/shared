export class Page {
    private static i0: Page;

    public static i(): Page {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public reload = (): void => {
        globalThis.location.reload();
    };
}
