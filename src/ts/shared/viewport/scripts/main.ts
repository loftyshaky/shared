export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
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
