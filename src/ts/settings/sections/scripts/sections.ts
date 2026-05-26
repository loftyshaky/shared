class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public reload_ext = (): void =>
        err(() => {
            ext.send_msg({ msg: 'reload_ext' });
        }, 'shr_1084');
}

export const Sections = Class.get_instance();
