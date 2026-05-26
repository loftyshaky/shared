class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public browser = (): string =>
        err(
            () =>
                Object.prototype.hasOwnProperty.call(window, 'env') && env.env === 'ext'
                    ? ` ${env.browser}`
                    : '',
            'shr_1334',
        );
}

export const AppVersion = Class.get_instance();
