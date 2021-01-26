export class Viewport {
    private static i0: Viewport;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public get_dim = ({ dim }: { dim: 'width' | 'height' }): number => err(() => (
        dim === 'width'
            ? document.documentElement.clientWidth
            : document.documentElement.clientHeight
    ),
    's1031');
}
