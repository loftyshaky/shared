class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public type = (): string => err(() => (env.env === 'ext' ? 'ext' : 'app'), 'shr_1319');
}

export const Env = Class.get_instance();
