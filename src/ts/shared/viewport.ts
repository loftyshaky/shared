export class Viewport {
    private static i0: Viewport;

    public static i(): Viewport {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public get_dim = ({ dim }: { dim: 'width' | 'height' }): number =>
        err(
            () =>
                dim === 'width'
                    ? document.documentElement.clientWidth
                    : document.documentElement.clientHeight,
            'shr_1077',
        );
}
