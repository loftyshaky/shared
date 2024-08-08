class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public display = (): Promise<void> =>
        err_async(async () => {
            we.tabs.create({ url: we.runtime.getURL('announcement.html') });
        }, 'shr_1231');
}

export const Visibility = Class.get_instance();
