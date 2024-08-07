class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public reload = (): void => {
        globalThis.location.reload();
    };
}

export const Page = Class.get_instance();
