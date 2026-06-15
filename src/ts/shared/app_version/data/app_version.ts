class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public browser = (): string =>
        err(() => {
            return n(env) && env.env === 'ext' ? ` ${env.browser}` : '';
        }, 'shr_1334');
}

export const AppVersion = Class.get_instance();
