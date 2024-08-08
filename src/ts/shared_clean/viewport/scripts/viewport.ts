class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public get_dim = ({ dim }: { dim: 'width' | 'height' }): number =>
        err(
            () =>
                dim === 'width'
                    ? document.documentElement.clientWidth
                    : document.documentElement.clientHeight,
            'shr_1139',
        );
}

export const Viewport = Class.get_instance();
