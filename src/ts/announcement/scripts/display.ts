export class Display {
    private static i0: Display;

    public static i(): Display {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public display_announcement = (): Promise<void> =>
        err_async(async () => {
            we.tabs.create({ url: we.runtime.getURL('announcement.html') });
        }, 'shr_1231');
}
